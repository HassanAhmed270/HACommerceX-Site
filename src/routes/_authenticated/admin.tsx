import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Plus, Trash2, Pencil, X, Briefcase, Users, LayoutDashboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Dashboard · HACommerceX" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

type Project = {
  id: string; title: string; description: string; category: string;
  technologies: string[]; image_url: string | null; live_link: string | null; github_link: string | null;
};
type Partner = {
  id: string; name: string; description: string; logo_url: string | null; website: string | null;
};

type Tab = "projects" | "partners";

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("projects");
  const [email, setEmail] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
    refresh();
  }, []);

  async function refresh() {
    const [{ data: p }, { data: pa }] = await Promise.all([
      supabase.from("projects").select("*").order("display_order"),
      supabase.from("partners").select("*").order("display_order"),
    ]);
    setProjects((p ?? []) as Project[]);
    setPartners((pa ?? []) as Partner[]);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/loginAtAdmin" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8 rounded-lg" />
            <span className="font-display text-base font-bold">
              HA<span className="text-primary-glow">CommerceX</span>
              <span className="ml-2 rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-glow">Admin</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">{email}</span>
            <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs font-medium hover:border-primary/60">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
            <LayoutDashboard size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage portfolio and partners.</p>
          </div>
        </div>

        <div className="mb-6 inline-flex rounded-xl border border-border bg-secondary/40 p-1">
          <TabBtn active={tab === "projects"} onClick={() => setTab("projects")} icon={Briefcase} label={`Projects (${projects.length})`} />
          <TabBtn active={tab === "partners"} onClick={() => setTab("partners")} icon={Users} label={`Partners (${partners.length})`} />
        </div>

        {tab === "projects" && (
          <section>
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setEditingProject({ id: "", title: "", description: "", category: "Web", technologies: [], image_url: null, live_link: null, github_link: null })}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground glow-primary"
              >
                <Plus size={16} /> New Project
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <div key={p.id} className="glass rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-glow">{p.category}</span>
                      <h3 className="mt-1 font-semibold">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {p.technologies.map((t) => (
                          <span key={t} className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[10px]">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <IconBtn onClick={() => setEditingProject(p)} icon={Pencil} />
                      <IconBtn danger onClick={async () => { if (confirm("Delete project?")) { await supabase.from("projects").delete().eq("id", p.id); refresh(); } }} icon={Trash2} />
                    </div>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="glass col-span-2 rounded-2xl p-10 text-center text-sm text-muted-foreground">
                  No projects yet. Click <strong>New Project</strong> to add one.
                </div>
              )}
            </div>
          </section>
        )}

        {tab === "partners" && (
          <section>
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setEditingPartner({ id: "", name: "", description: "", logo_url: null, website: null })}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground glow-primary"
              >
                <Plus size={16} /> New Partner
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {partners.map((p) => (
                <div key={p.id} className="glass rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                      {p.website && <a href={p.website} className="mt-2 block text-xs text-primary-glow">{p.website}</a>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <IconBtn onClick={() => setEditingPartner(p)} icon={Pencil} />
                      <IconBtn danger onClick={async () => { if (confirm("Delete partner?")) { await supabase.from("partners").delete().eq("id", p.id); refresh(); } }} icon={Trash2} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {editingProject && (
        <ProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSaved={() => { setEditingProject(null); refresh(); }}
        />
      )}
      {editingPartner && (
        <PartnerModal
          partner={editingPartner}
          onClose={() => setEditingPartner(null)}
          onSaved={() => { setEditingPartner(null); refresh(); }}
        />
      )}
    </div>
  );
}

function TabBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: React.ElementType; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon size={14} /> {label}
    </button>
  );
}

function IconBtn({ onClick, icon: Icon, danger }: { onClick: () => void; icon: React.ElementType; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border transition-all ${
        danger ? "hover:border-destructive/60 hover:text-destructive" : "hover:border-primary/60 hover:text-primary-glow"
      }`}
    >
      <Icon size={14} />
    </button>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg glass-strong rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="rounded-lg border border-border p-1.5 hover:border-primary/60"><X size={14} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input {...props} className="mt-1.5 w-full rounded-xl border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
    </label>
  );
}
function TextArea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <textarea {...props} className="mt-1.5 w-full rounded-xl border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
    </label>
  );
}

function ProjectModal({ project, onClose, onSaved }: { project: Project; onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState({
    title: project.title, description: project.description, category: project.category,
    technologies: project.technologies.join(", "),
    image_url: project.image_url ?? "", live_link: project.live_link ?? "", github_link: project.github_link ?? "",
  });
  const [saving, setSaving] = useState(false);
  const isNew = !project.id;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: f.title, description: f.description, category: f.category,
      technologies: f.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      image_url: f.image_url || null, live_link: f.live_link || null, github_link: f.github_link || null,
    };
    const { error } = isNew
      ? await supabase.from("projects").insert(payload)
      : await supabase.from("projects").update(payload).eq("id", project.id);
    setSaving(false);
    if (error) { alert(error.message); return; }
    onSaved();
  }

  return (
    <Modal title={isNew ? "New Project" : "Edit Project"} onClose={onClose}>
      <form onSubmit={save} className="space-y-3">
        <Field label="Title" required value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
        <TextArea label="Description" rows={3} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
        <Field label="Category" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} placeholder="E-Commerce, POS, Mobile…" />
        <Field label="Technologies (comma separated)" value={f.technologies} onChange={(e) => setF({ ...f, technologies: e.target.value })} placeholder="React, Node, MongoDB" />
        <Field label="Image URL" value={f.image_url} onChange={(e) => setF({ ...f, image_url: e.target.value })} placeholder="https://…" />
        <Field label="Live Link" value={f.live_link} onChange={(e) => setF({ ...f, live_link: e.target.value })} />
        <Field label="GitHub Link" value={f.github_link} onChange={(e) => setF({ ...f, github_link: e.target.value })} />
        <button disabled={saving} className="mt-2 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground glow-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save Project"}
        </button>
      </form>
    </Modal>
  );
}

function PartnerModal({ partner, onClose, onSaved }: { partner: Partner; onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState({
    name: partner.name, description: partner.description,
    logo_url: partner.logo_url ?? "", website: partner.website ?? "",
  });
  const [saving, setSaving] = useState(false);
  const isNew = !partner.id;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { name: f.name, description: f.description, logo_url: f.logo_url || null, website: f.website || null };
    const { error } = isNew
      ? await supabase.from("partners").insert(payload)
      : await supabase.from("partners").update(payload).eq("id", partner.id);
    setSaving(false);
    if (error) { alert(error.message); return; }
    onSaved();
  }

  return (
    <Modal title={isNew ? "New Partner" : "Edit Partner"} onClose={onClose}>
      <form onSubmit={save} className="space-y-3">
        <Field label="Name" required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <TextArea label="Description" rows={2} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
        <Field label="Logo URL" value={f.logo_url} onChange={(e) => setF({ ...f, logo_url: e.target.value })} />
        <Field label="Website" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} />
        <button disabled={saving} className="mt-2 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground glow-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save Partner"}
        </button>
      </form>
    </Modal>
  );
}