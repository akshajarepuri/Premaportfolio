
-- set_updated_at already SECURITY INVOKER; set search_path
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Restrict SECURITY DEFINER function execute
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
-- handle_new_user only called by trigger as postgres/service; nothing else needed.

-- Tighten contact_messages insert: require basic non-empty fields
DROP POLICY IF EXISTS "anyone can send message" ON public.contact_messages;
CREATE POLICY "anyone can send message" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 100
    AND length(trim(email)) BETWEEN 3 AND 255
    AND length(trim(message)) BETWEEN 1 AND 2000
  );
