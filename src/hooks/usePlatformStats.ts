import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PlatformStats {
  learners: number;
  lessons_completed: number;
  certificates_issued: number;
  review_count: number;
  avg_rating: number | null;
}

export const formatIndian = (n: number) => new Intl.NumberFormat("en-IN").format(n);

export const usePlatformStats = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase.functions.invoke("platform-stats").then(({ data, error }) => {
      if (!active) return;
      if (!error && data) setStats(data as unknown as PlatformStats);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return { stats, loading };
};