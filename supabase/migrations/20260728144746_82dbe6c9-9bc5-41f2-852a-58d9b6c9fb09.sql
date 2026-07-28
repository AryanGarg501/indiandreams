-- Certificates: owner-only insert, no update/delete
REVOKE UPDATE, DELETE ON public.certificates FROM authenticated, anon;
GRANT SELECT, INSERT ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;

DROP POLICY IF EXISTS "Users can insert their own certificates" ON public.certificates;
CREATE POLICY "Users can insert their own certificates"
ON public.certificates FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Lesson progress: owner-only update
DROP POLICY IF EXISTS "Users can update their own progress" ON public.lesson_progress;
CREATE POLICY "Users can update their own progress"
ON public.lesson_progress FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Trigger-only security definer functions must not be callable via the API
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- issue_certificate is only for signed-in users
REVOKE ALL ON FUNCTION public.issue_certificate(text, text, text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.issue_certificate(text, text, text, integer) TO authenticated;