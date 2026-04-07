-- 005_enquiries.sql
-- Contact enquiries table used by /contact form

create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  email text not null,
  phone text,
  service text not null,
  message text not null,
  status text not null default 'new'
);

create index if not exists idx_enquiries_created_at on public.enquiries (created_at desc);

alter table public.enquiries enable row level security;

create policy "Allow anonymous enquiry inserts"
  on public.enquiries
  for insert
  to anon
  with check (true);

create policy "Allow authenticated read enquiries"
  on public.enquiries
  for select
  to authenticated
  using (true);
