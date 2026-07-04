/**
 * currency-rates edge function
 * ----------------------------
 * Fetches live currency exchange rates from the free ExchangeRate-API
 * (https://open.er-api.com/v6/latest/USD — no API key required) and
 * returns them to the frontend. Proxied through an edge function per
 * best practice: keeps external API calls server-side.
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
    // Fetch live rates from the free, no-key-required ExchangeRate-API
    const response = await fetch("https://open.er-api.com/v6/latest/USD");

    if (!response.ok) {
      throw new Error(`Upstream API returned ${response.status}`);
    }

    const data = await response.json();

    // Validate the response shape before returning
    if (!data || !data.rates || typeof data.rates !== "object") {
      throw new Error("Invalid response from exchange rate API");
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
    return new Response(
      JSON.stringify({ error: err.message || "Failed to fetch exchange rates" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
