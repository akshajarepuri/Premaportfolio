import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BackgroundFX } from "@/components/portfolio/BackgroundFX";
import { useProjects, useSkills, useExperience, useEducation, useAchievements, useCertifications, useServices } from "@/lib/portfolio-data";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Trash2, ArrowLeft, Plus, Inbox } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Portfolio" }, { name: "description", content: "Portfolio admin dashboard." }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { navigate({ to: "/auth" }); return; }
      setEmail(data.user.email ?? "");
      setUserId(data.user.id);
      const { data: role } = await (supabase as any).from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!role);
      setReady(true);
    })();
  }, [navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (!ready) return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;

  return (
    <div className="relative min-h-screen">
      <BackgroundFX />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={14} /> Site</Link>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">{email}</span>
          <button onClick={signOut} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:border-primary hover:text-primary"><LogOut size={14} /> Sign out</button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl space-y-8 px-6 pb-16">
        <div>
          <h1 className="font-display text-4xl font-bold"><span className="gradient-text">Admin Dashboard</span></h1>
          <p className="mt-1 text-muted-foreground">Manage every piece of content that powers the portfolio.</p>
        </div>
        {!isAdmin ? <NotAdmin userId={userId} /> : <AdminContent />}
      </main>
    </div>
  );
}

function NotAdmin({ userId }: { userId: string }) {
  return (
    <div className="glass card-shadow rounded-2xl p-8">
      <h2 className="font-display text-xl font-semibold">You're signed in, but not an admin yet.</h2>
      <p className="mt-2 text-sm text-muted-foreground">Grant the admin role to your user in Lovable Cloud → Database → user_roles, then refresh.</p>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-background/60 p-4 text-xs">{`INSERT INTO public.user_roles (user_id, role) VALUES ('${userId}', 'admin');`}</pre>
    </div>
  );
}

function AdminContent() {
  return (
    <div className="grid gap-6">
      <CrudSection name="projects" title="Projects" fields={["title","description","tech","github_url","live_url","image_url","sort_order"]} listHook={useProjects} />
      <CrudSection name="skills" title="Skills" fields={["category","name","sort_order"]} listHook={useSkills} />
      <CrudSection name="experience" title="Experience" fields={["role","company","period","description","bullets","sort_order"]} listHook={useExperience} />
      <CrudSection name="education" title="Education" fields={["institution","degree","period","score","sort_order"]} listHook={useEducation} />
      <CrudSection name="achievements" title="Achievements" fields={["title","description","year","sort_order"]} listHook={useAchievements} />
      <CrudSection name="certifications" title="Certifications" fields={["name","issuer","year","url","sort_order"]} listHook={useCertifications} />
      <CrudSection name="services" title="Services" fields={["title","description","icon","sort_order"]} listHook={useServices} />
      <MessagesInbox />
    </div>
  );
}

function CrudSection({ name, title, fields, listHook }: { name: string; title: string; fields: string[]; listHook: any }) {
  const { data = [], refetch } = listHook();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  async function add() {
    const payload: Record<string, any> = {};
    for (const f of fields) {
      const v = values[f] ?? "";
      if (f === "tech" || f === "bullets") payload[f] = v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];
      else if (f === "sort_order") payload[f] = v ? Number(v) : 0;
      else if (v) payload[f] = v;
    }
    const { error } = await (supabase as any).from(name).insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Added");
    setValues({}); setOpen(false); refetch(); qc.invalidateQueries({ queryKey: [name] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    const { error } = await (supabase as any).from(name).delete().eq("id", id);
    if (error) return toast.error(error.message);
    refetch(); qc.invalidateQueries({ queryKey: [name] });
  }

  return (
    <section className="glass card-shadow rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">{title} <span className="text-sm text-muted-foreground">({data.length})</span></h2>
        <button onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-1 rounded-full border border-primary/40 px-3 py-1.5 text-xs text-primary hover:bg-primary/10">
          <Plus size={14} /> New
        </button>
      </div>
      {open && (
        <div className="mb-4 grid gap-3 rounded-xl border border-border bg-background/40 p-4 md:grid-cols-2">
          {fields.map((f) => (
            <label key={f} className="text-xs">
              <span className="mb-1 block uppercase tracking-widest text-muted-foreground">{f}</span>
              <input value={values[f] ?? ""} onChange={(e) => setValues({ ...values, [f]: e.target.value })}
                placeholder={f === "tech" || f === "bullets" ? "comma, separated" : ""}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            </label>
          ))}
          <div className="col-span-full flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="rounded-full border border-border px-4 py-2 text-xs">Cancel</button>
            <button onClick={add} className="rounded-full gradient-bg px-4 py-2 text-xs font-semibold text-primary-foreground">Save</button>
          </div>
        </div>
      )}
      <ul className="divide-y divide-border/60">
        {data.map((row: any) => (
          <li key={row.id} className="flex items-center justify-between gap-4 py-3 text-sm">
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{row.title || row.name || row.role || row.institution}</div>
              <div className="truncate text-xs text-muted-foreground">{row.description || row.category || row.company || row.degree || row.issuer || ""}</div>
            </div>
            <button onClick={() => remove(row.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MessagesInbox() {
  const [msgs, setMsgs] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any).from("contact_messages").select("*").order("created_at", { ascending: false });
      setMsgs(data ?? []);
    })();
  }, []);
  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await (supabase as any).from("contact_messages").delete().eq("id", id);
    setMsgs((m) => m.filter((x) => x.id !== id));
  }
  return (
    <section className="glass card-shadow rounded-2xl p-6">
      <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold"><Inbox size={18} /> Contact Messages <span className="text-sm text-muted-foreground">({msgs.length})</span></h2>
      <ul className="space-y-3">
        {msgs.map((m) => (
          <li key={m.id} className="rounded-xl border border-border bg-background/40 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{m.name} <span className="text-xs text-muted-foreground">· {m.email}</span></div>
                {m.subject && <div className="text-xs text-muted-foreground">{m.subject}</div>}
                <p className="mt-2 whitespace-pre-wrap text-sm">{m.message}</p>
                <div className="mt-2 text-[11px] text-muted-foreground">{new Date(m.created_at).toLocaleString()}</div>
              </div>
              <button onClick={() => remove(m.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
            </div>
          </li>
        ))}
        {msgs.length === 0 && <li className="py-8 text-center text-sm text-muted-foreground">No messages yet.</li>}
      </ul>
    </section>
  );
}