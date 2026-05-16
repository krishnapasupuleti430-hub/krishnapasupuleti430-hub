import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { ingredients, goal, budget, country, isHostel, mealType } = await req.json();

    const countryContext = country === "India"
      ? "Focus on Indian foods like dal, roti, rice, paneer, curd, dosa, idli, poha, chicken curry. Use Indian measurements and budget in INR."
      : `User is from ${country}. Suggest locally available meals and ingredients.`;

    const hostelContext = isHostel ? "User is in a hostel with limited cooking access. Suggest no-cook or minimal-cook meals only." : "";

    const budgetContext = budget ? `Budget constraint: Rs.${budget}/day maximum.` : "";

    const prompt = `You are Caesar AI, a premium fitness nutrition expert. Generate a detailed meal plan based on:

Available ingredients: ${ingredients}
Goal: ${goal || "muscle_gain"}
${countryContext}
${hostelContext}
${budgetContext}
Meal type: ${mealType || "full_day"}

Return a JSON array of meals with this exact structure:
[{
  "name": "Meal name",
  "type": "breakfast|lunch|dinner|snack",
  "time": "Suggested time",
  "calories": number,
  "protein": number (in grams),
  "carbs": number (in grams),
  "fats": number (in grams),
  "ingredients": ["list of ingredients with quantities"],
  "instructions": "Brief cooking instructions",
  "budget_cost": number (in INR or local currency)
}]

Generate 4-6 meals covering the full day. Be specific with quantities. Optimize for the user's goal. Return ONLY valid JSON, no markdown.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are Caesar AI nutrition expert. Return only valid JSON arrays. No markdown formatting." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "[]";

    let meals;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      meals = JSON.parse(cleaned);
    } catch {
      meals = [];
    }

    return new Response(
      JSON.stringify({ meals, error: null }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ meals: [], error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
