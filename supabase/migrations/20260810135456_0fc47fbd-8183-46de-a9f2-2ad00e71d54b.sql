-- 1. Server-side course reference data
CREATE TABLE public.courses (
  course_id text PRIMARY KEY,
  title text NOT NULL,
  required_lessons integer NOT NULL CHECK (required_lessons > 0),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.courses TO anon;
GRANT SELECT ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are readable by everyone"
ON public.courses FOR SELECT
TO anon, authenticated
USING (true);

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.courses (course_id, title, required_lessons) VALUES
  ('claude','Claude',10),
  ('gemini','Gemini',10),
  ('chatgpt','ChatGPT',13),
  ('jasper-ai','Jasper AI',10),
  ('stable-diffusion','Stable Diffusion',10),
  ('28-day-ai','2026 28-Day AI Challenge',28),
  ('junior-ai','Junior AI Challenge',28),
  ('14-day-side-gigs','14-Day AI Side Gigs Challenge',14)
ON CONFLICT (course_id) DO NOTHING;

-- 2. Payment orders ledger (backend only)
CREATE TABLE public.payment_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text NOT NULL UNIQUE,
  email text NOT NULL,
  plan text NOT NULL,
  amount_paise integer NOT NULL,
  redeemed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.payment_orders TO service_role;

ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_payment_orders_updated_at
BEFORE UPDATE ON public.payment_orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Certificate issuance no longer trusts client-supplied metadata
DROP FUNCTION IF EXISTS public.issue_certificate(text, text, text, integer);
DROP FUNCTION IF EXISTS public.get_public_certificate(uuid);

CREATE OR REPLACE FUNCTION public.issue_certificate(_course_id text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'public'
AS $function$
DECLARE
  _user_id uuid;
  _title text;
  _required int;
  _completed_count int;
  _name text;
  _cert_id uuid;
BEGIN
  _user_id := auth.uid();
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT c.title, c.required_lessons INTO _title, _required
  FROM public.courses c
  WHERE c.course_id = _course_id;

  IF _title IS NULL THEN
    RAISE EXCEPTION 'Unknown course';
  END IF;

  SELECT COUNT(DISTINCT (lp.module_id || ':' || lp.lesson_id)) INTO _completed_count
  FROM public.lesson_progress lp
  WHERE lp.user_id = _user_id AND lp.course_id = _course_id;

  IF _completed_count < _required THEN
    RAISE EXCEPTION 'Course not fully completed';
  END IF;

  SELECT id INTO _cert_id
  FROM public.certificates
  WHERE user_id = _user_id AND course_id = _course_id;

  IF _cert_id IS NOT NULL THEN
    RETURN _cert_id;
  END IF;

  SELECT NULLIF(TRIM(COALESCE(p.full_name, '')), '') INTO _name
  FROM public.profiles p
  WHERE p.user_id = _user_id;

  INSERT INTO public.certificates (user_id, course_id, course_title, user_name)
  VALUES (_user_id, _course_id, _title, COALESCE(_name, 'Learner'))
  RETURNING id INTO _cert_id;

  RETURN _cert_id;
END;
$function$;

REVOKE ALL ON FUNCTION public.issue_certificate(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.issue_certificate(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.issue_certificate(text) TO authenticated;