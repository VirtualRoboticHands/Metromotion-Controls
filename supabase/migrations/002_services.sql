-- 002_services.sql
-- Services and related content

create table if not exists public.services (
  id bigserial primary key,
  slug text not null unique,
  name text not null,
  short_description text,
  hero_title text,
  hero_description text,
  body_md text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_features (
  id bigserial primary key,
  service_id bigint not null references public.services(id) on delete cascade,
  title text not null,
  description text,
  sort_order integer not null default 0
);

create index if not exists idx_services_published_sort
  on public.services (is_published, sort_order asc, created_at desc);

create index if not exists idx_service_features_service_id_sort
  on public.service_features (service_id, sort_order asc);

create trigger set_services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

alter table public.services enable row level security;
alter table public.service_features enable row level security;

-- Public can only read published services
create policy "Public can read published services"
  on public.services
  for select
  to anon, authenticated
  using (is_published = true);

create policy "Public can read features for published services"
  on public.service_features
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.services s
      where s.id = service_features.service_id
        and s.is_published = true
    )
  );

-- Authenticated users can manage service content
create policy "Authenticated can manage services"
  on public.services
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can manage service features"
  on public.service_features
  for all
  to authenticated
  using (true)
  with check (true);
