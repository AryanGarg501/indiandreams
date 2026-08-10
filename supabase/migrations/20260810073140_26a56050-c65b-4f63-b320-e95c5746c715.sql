CREATE OR REPLACE FUNCTION public.get_public_certificate(_id uuid)
RETURNS TABLE (
  id uuid,
  user_name text,
  course_id text,
  course_title text,
  completed_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.id, c.user_name, c.course_id, c.course_title, c.completed_at
  FROM public.certificates c
  WHERE c.id = _id
$$;

REVOKE EXECUTE ON FUNCTION public.get_public_certificate(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_certificate(uuid) TO anon, authenticated;