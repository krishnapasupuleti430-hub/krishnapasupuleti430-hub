import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const PLANS: Record<string, { monthly: string; yearly: string }> = {
  student: { monthly: "price_student_monthly", yearly: "price_student_yearly" },
  pro: { monthly: "price_pro_monthly", yearly: "price_pro_yearly" },
  elite: { monthly: "price_elite_monthly", yearly: "price_elite_yearly" },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { plan, billing, userId, email } = await req.json();
    const planConfig = PLANS[plan];

    if (!planConfig) {
      return new Response(
        JSON.stringify({ error: "Invalid plan" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const priceId = billing === "yearly" ? planConfig.yearly : planConfig.monthly;
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");

    if (!STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "Stripe not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const session = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "subscription",
        "payment_method_types[0]": "card",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "success_url": `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        "cancel_url": `${req.headers.get("origin")}/pricing`,
        "customer_email": email,
        "metadata[user_id]": userId,
        "metadata[plan]": plan,
        "metadata[billing]": billing,
      }),
    });

    const sessionData = await session.json();

    return new Response(
      JSON.stringify({ url: sessionData.url, sessionId: sessionData.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
