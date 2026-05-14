-- 1. Roles enum + user_roles table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Security definer function to check role (avoids recursive RLS)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

-- Users can read their own roles; only admins can modify roles
create policy "Users can view own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);
create policy "Admins manage roles" on public.user_roles
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Bootstrap function: lets the FIRST authenticated user claim admin
-- (Only succeeds while no admin exists yet)
create or replace function public.claim_initial_admin()
returns boolean
language plpgsql security definer set search_path = public
as $$
declare
  admin_count int;
begin
  if auth.uid() is null then
    raise exception 'Must be authenticated';
  end if;
  select count(*) into admin_count from public.user_roles where role = 'admin';
  if admin_count > 0 then
    return false;
  end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin')
  on conflict do nothing;
  return true;
end;
$$;

-- 2. Projects table
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null default 'Web',
  technologies text[] not null default '{}',
  image_url text,
  live_link text,
  github_link text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;

create policy "Anyone can view projects" on public.projects
  for select using (true);
create policy "Admins manage projects" on public.projects
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- 3. Partners table
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  description text not null default '',
  website text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.partners enable row level security;

create policy "Anyone can view partners" on public.partners
  for select using (true);
create policy "Admins manage partners" on public.partners
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger projects_set_updated_at before update on public.projects
for each row execute function public.set_updated_at();

-- Seed initial partner
insert into public.partners (name, description, display_order)
values ('AKA_WMart', 'Timeless. Elegance. You.', 1);