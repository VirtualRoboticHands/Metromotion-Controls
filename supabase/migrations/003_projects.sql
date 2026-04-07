-- 003_projects.sql
-- Projects / case studies

create table if not exists public.projects (
  id bigserial primary key,
  slug text not null unique,
  title text not null,
  client_name text,
  industry text,
  location text,
  summary text,
  challenge_md text,
  solution_md text,
  outcomes_md text,
  hero_image_url text,
  published_at timestamptz,
  is_published boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_services (
  project_id bigint not null references public.projects(id) on delete cascade,
  service_id bigint not null references public.services(id) on delete restrict,
  primary key (project_id, service_id)
);

create index if not exists idx_projects_published_featured
  on public.projects (is_published, is_featured desc, published_at desc nulls last);

create index if not exists idx_project_services_service_id
  on public.project_services (service_id);

create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.project_services enable row level security;

-- Public can read only published projects
create policy "Public can read published projects"
  on public.projects
  for select
  to anon, authenticated
  using (is_published = true);

create policy "Public can read project-service mappings for published projects"
  on public.project_services
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.projects p
      where p.id = project_services.project_id
        and p.is_published = true
    )
  );

-- Authenticated users can manage projects
create policy "Authenticated can manage projects"
  on public.projects
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can manage project-service mappings"
  on public.project_services
  for all
  to authenticated
  using (true)
  with check (true);
