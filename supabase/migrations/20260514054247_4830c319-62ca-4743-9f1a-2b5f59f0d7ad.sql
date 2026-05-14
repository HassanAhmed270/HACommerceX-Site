
-- site_content (key/value JSON store for editable sections)
create table public.site_content (
  section text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
create policy "Anyone can view site_content" on public.site_content for select using (true);
create policy "Admins manage site_content" on public.site_content for all to authenticated
  using (has_role(auth.uid(), 'admin')) with check (has_role(auth.uid(), 'admin'));
create trigger site_content_updated before update on public.site_content
  for each row execute function public.set_updated_at();

-- services table
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  icon text not null default 'Sparkles',
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.services enable row level security;
create policy "Anyone can view services" on public.services for select using (true);
create policy "Admins manage services" on public.services for all to authenticated
  using (has_role(auth.uid(), 'admin')) with check (has_role(auth.uid(), 'admin'));
create trigger services_updated before update on public.services
  for each row execute function public.set_updated_at();

-- public RPC to check if any admin exists (so the signup tab can be hidden)
create or replace function public.admin_exists()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where role = 'admin');
$$;
grant execute on function public.admin_exists() to anon, authenticated;

-- seed default site content
insert into public.site_content (section, content) values
  ('home', '{
    "badge": "BUILD • DESIGN • GROW",
    "headline_pre": "We Build",
    "headline_highlight": "Modern Digital",
    "headline_post": "Solutions For Businesses",
    "subtitle": "Premium MERN Stack systems tailored for growth, performance, and scalability — engineered with futuristic design and enterprise-grade security.",
    "primary_cta": "Get Started",
    "secondary_cta": "View Services",
    "stats": [
      {"k": "120+", "v": "Projects Delivered"},
      {"k": "50+", "v": "Happy Clients"},
      {"k": "99.9%", "v": "Uptime SLA"},
      {"k": "24/7", "v": "Support"}
    ]
  }'::jsonb),
  ('about', '{
    "eyebrow": "About HACommerceX",
    "title_pre": "A modern software studio engineering",
    "title_highlight": "digital businesses",
    "title_post": ".",
    "paragraph_1": "HACommerceX Solutions designs and builds high-performance digital systems for ambitious teams. From e-commerce platforms and POS to admin dashboards and mobile apps, we deliver software that is fast, secure, and built to scale.",
    "paragraph_2": "We believe great software is invisible — it just works. Our engineering culture is rooted in clean architecture, modern UI/UX, and a relentless commitment to quality and security."
  }'::jsonb),
  ('contact', '{
    "eyebrow": "Get In Touch",
    "title": "Let''s build something great together.",
    "subtitle": "Tell us about your project. We''ll get back within 24 hours.",
    "email": "hamommercex@gmail.com",
    "phone": "",
    "address": "",
    "whatsapp": "",
    "facebook": ""
  }'::jsonb)
on conflict (section) do nothing;

-- seed default services
insert into public.services (title, description, icon, display_order) values
  ('E-Commerce Websites', 'High-converting online stores with seamless checkout.', 'ShoppingBag', 1),
  ('Billing Systems', 'Automated invoicing, taxes, and recurring billing.', 'Receipt', 2),
  ('POS Systems', 'Fast, reliable point-of-sale for retail and F&B.', 'CreditCard', 3),
  ('Admin Dashboards', 'Realtime analytics with role-based controls.', 'LayoutDashboard', 4),
  ('Mobile Applications', 'Native-feeling apps for iOS and Android.', 'Smartphone', 5),
  ('Inventory Management', 'Track stock, suppliers, and warehouses live.', 'Boxes', 6),
  ('UI/UX Design', 'Premium interfaces that feel effortless.', 'Palette', 7),
  ('Website Maintenance', 'Updates, monitoring, and 24/7 support.', 'Wrench', 8);
