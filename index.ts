/**
 * currency-rates edge function
 * ----------------------------
 * Fetches live currency exchange rates from FastForex API
 * Uses API key from environment variable for secure production deployment
 *
 * Environment Variables:
 * - FASTFOREX_API_KEY: Your FastForex API key (configured in Netlify)
 *
 * Endpoint: GET /functions/v1/currency-rates
 * Returns:  { base: "USD", rates: { EUR: 0.92, GBP: 0.79, ... }, updated: "..." }
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Get API key from environment variable (NEVER hardcode keys)
    const apiKey = Deno.env.get("FASTFOREX_API_KEY");

    if (!apiKey) {
      throw new Error(
        "FASTFOREX_API_KEY environment variable not configured. Please set it in Netlify Environment Settings."
      );
    }

    // Fetch live rates from FastForex API
    const apiUrl = `https://api.fastforex.io/fetch?from=USD&to=EUR,GBP,JPY,AUD,CAD,CHF,CNY,INR,PKR,SGD,AED,NZD,MXN,BRL,ZAR,HKD&api_key=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your FASTFOREX_API_KEY configuration.");
      }
      throw new Error(`FastForex API returned status ${response.status}`);
    }

    const data = await response.json();

    // Validate the response shape before returning
    if (!data || !data.results || typeof data.results !== "object") {
      throw new Error("Invalid response structure from FastForex API");
    }

    // Transform FastForex format to standard format (add USD as base rate 1.0)
    const rates = {
      USD: 1.0,
      ...data.results,
    };

    return new Response(
      JSON.stringify({
        base: "USD",
        rates: rates,
        updated: data.updated || new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Currency rates error:", errorMessage);

    return new Response(
      JSON.stringify({
        error: errorMessage || "Failed to fetch exchange rates. Please try again later.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
