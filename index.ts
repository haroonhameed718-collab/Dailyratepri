/**
 * currency-rates edge function
 * ----------------------------
 * Fetches live currency exchange rates from ExchangeRate-API
 * Uses API key from environment variable for production deployment
 *
 * Environment Variables:
 * - REACT_APP_API_KEY: Your ExchangeRate-API key (required for production)
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
    // Get API key from environment variable
    const apiKey = Deno.env.get("REACT_APP_API_KEY");

    // Build the API URL based on whether API key is available
    let apiUrl: string;
    if (apiKey) {
      // Use API key if available (for production with enhanced rate limits)
      apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    } else {
      // Fallback to free API endpoint (development only)
      console.warn(
        "REACT_APP_API_KEY not configured. Using free tier API (limited rates)."
      );
      apiUrl = "https://open.er-api.com/v6/latest/USD";
    }

    // Fetch live rates from the API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `API returned status ${response.status}. Please check your API key configuration.`
      );
    }

    const data = await response.json();

    // Validate the response shape before returning
    if (!data || !data.rates || typeof data.rates !== "object") {
      throw new Error("Invalid response structure from exchange rate API");
    }

    return new Response(
      JSON.stringify({
        base: "USD",
        rates: data.rates,
        updated: data.time_last_update_utc || new Date().toISOString(),
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
