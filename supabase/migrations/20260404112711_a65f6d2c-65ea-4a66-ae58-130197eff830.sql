
-- Create a secure function to issue certificates only after validating completion
CREATE OR REPLACE FUNCTION public.issue_certificate(
  _course_id text,
  _course_title text,
  _user_name text,
  _expected_lessons int
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
  _completed_count int;
  _cert_id uuid;
BEGIN
  _user_id := auth.uid();
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Count completed lessons for this course
  SELECT COUNT(*) INTO _completed_count
  FROM public.lesson_progress
  WHERE user_id = _user_id AND course_id = _course_id;

  -- Verify all lessons are completed
  IF _completed_count < _expected_lessons OR _expected_lessons < 1 THEN
    RAISE EXCEPTION 'Course not fully completed. Completed: %, Required: %', _completed_count, _expected_lessons;
  END IF;

  -- Check if certificate already exists
  SELECT id INTO _cert_id
  FROM public.certificates
  WHERE user_id = _user_id AND course_id = _course_id;

  IF _cert_id IS NOT NULL THEN
    RETURN _cert_id;
  END IF;

  -- Issue certificate
  INSERT INTO public.certificates (user_id, course_id, course_title, user_name)
  VALUES (_user_id, _course_id, _course_title, _user_name)
  RETURNING id INTO _cert_id;

  RETURN _cert_id;
END;
$$;

-- Remove the direct INSERT policy on certificates
DROP POLICY IF EXISTS "Users can insert their own certificates" ON public.certificates;
