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
    const { goal, level, equipment, duration, targetMuscle } = await req.json();

    const prompt = `You are Caesar AI, a premium fitness coach. Generate a detailed workout plan:

Goal: ${goal || "muscle_gain"}
Level: ${level || "beginner"}
Equipment: ${equipment || "none (home workout)"}
Duration: ${duration || 30} minutes
Target muscle: ${targetMuscle || "full_body"}

Return a JSON object with this exact structure:
{
  "name": "Workout plan name",
  "description": "Brief description",
  "total_duration": number (minutes),
  "calories_burned": number (estimated),
  "exercises": [{
    "name": "Exercise name",
    "sets": number,
    "reps": "reps or duration string",
    "rest_seconds": number,
    "target_muscle": "muscle group",
    "instructions": "Brief form instructions"
  }],
  "warmup": "Warm-up description",
  "cooldown": "Cool-down description"
}

Be specific and safe. Return ONLY valid JSON, no markdown.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are Caesar AI fitness coach. Return only valid JSON. No markdown formatting." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";

    let workout;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      workout = JSON.parse(cleaned);
    } catch {
      workout = { name: "AI Workout", exercises: [] };
    }

    return new Response(
      JSON.stringify({ workout, error: null }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ workout: null, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
