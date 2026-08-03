CREATE OR REPLACE FUNCTION public.issue_certificate(_course_id text, _course_title text, _user_name text, _expected_lessons integer)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
DECLARE
  _user_id uuid;
  _completed_count int;
  _cert_id uuid;
BEGIN
  _user_id := auth.uid();
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT COUNT(*) INTO _completed_count
  FROM public.lesson_progress
  WHERE user_id = _user_id AND course_id = _course_id;

  IF _completed_count < _expected_lessons OR _expected_lessons < 1 THEN
    RAISE EXCEPTION 'Course not fully completed';
  END IF;

  SELECT id INTO _cert_id
  FROM public.certificates
  WHERE user_id = _user_id AND course_id = _course_id;

  IF _cert_id IS NOT NULL THEN
    RETURN _cert_id;
  END IF;

  INSERT INTO public.certificates (user_id, course_id, course_title, user_name)
  VALUES (_user_id, _course_id, _course_title, _user_name)
  RETURNING id INTO _cert_id;

  RETURN _cert_id;
END;
$function$;

REVOKE ALL ON FUNCTION public.issue_certificate(text, text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.issue_certificate(text, text, text, integer) TO authenticated;