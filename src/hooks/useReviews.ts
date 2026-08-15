import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Review {
  id: string;
  user_id: string;
  name: string;
  role: string | null;
  rating: number;
  text: string;
  created_at: string;
}

export const useReviews = (limit = 12) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, user_id, name, role, rating, text, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (!error && data) setReviews(data as Review[]);
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  const average = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : null;

  return { reviews, loading, average, reload: load };
};