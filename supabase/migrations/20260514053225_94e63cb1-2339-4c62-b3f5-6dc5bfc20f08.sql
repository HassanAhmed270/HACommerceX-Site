-- Lock down security definer functions
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
revoke execute on function public.claim_initial_admin() from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.claim_initial_admin() to authenticated;

alter function public.set_updated_at() set search_path = public;