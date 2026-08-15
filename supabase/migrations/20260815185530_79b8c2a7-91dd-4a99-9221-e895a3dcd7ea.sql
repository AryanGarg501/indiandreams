DROP FUNCTION IF EXISTS public.platform_stats();

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;