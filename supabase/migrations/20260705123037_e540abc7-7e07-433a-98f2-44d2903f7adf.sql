
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ CONTENT TABLES ============
-- Generic policy shape: public SELECT; admin ALL.

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT,
  tech TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "admin write projects" ON public.projects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  level INT DEFAULT 80,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.skills TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.skills TO authenticated;
GRANT ALL ON public.skills TO service_role;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "admin write skills" ON public.skills FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  bullets TEXT[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.experience TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.experience TO authenticated;
GRANT ALL ON public.experience TO service_role;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "admin write experience" ON public.experience FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  period TEXT NOT NULL,
  score TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.education TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.education TO authenticated;
GRANT ALL ON public.education TO service_role;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read education" ON public.education FOR SELECT USING (true);
CREATE POLICY "admin write education" ON public.education FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  year TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.achievements TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.achievements TO authenticated;
GRANT ALL ON public.achievements TO service_role;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "admin write achievements" ON public.achievements FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  year TEXT,
  url TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.certifications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.certifications TO authenticated;
GRANT ALL ON public.certifications TO service_role;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "admin write certifications" ON public.certifications FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "admin write services" ON public.services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can send message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "admin read messages" ON public.contact_messages FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin delete messages" ON public.contact_messages FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
