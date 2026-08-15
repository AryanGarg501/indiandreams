import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const count = async (table: string) => {
      const { count } = await admin.from(table).select("*", { count: "exact", head: true });
      return count ?? 0;
    };

    const [learners, lessons_completed, certificates_issued, review_count] = await Promise.all([
      count("profiles"),
      count("lesson_progress"),
      count("certificates"),
      count("reviews"),
    ]);

    const { data: ratings } = await admin.from("reviews").select("rating");
    const avg_rating =
      ratings && ratings.length
        ? Math.round((ratings.reduce((s, r: any) => s + r.rating, 0) / ratings.length) * 10) / 10
        : null;

    return new Response(
      JSON.stringify({ learners, lessons_completed, certificates_issued, review_count, avg_rating }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (_e) {
    return new Response(JSON.stringify({ error: "stats_unavailable" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
