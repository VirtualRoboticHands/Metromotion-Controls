-- 001_contact.sql
-- Contact form submissions

create extension if not exists pgcrypto;


create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text,
  email text not null,
  challenge text not null,
  message text,
  submitted_at timestamptz not null default now(),
  is_read boolean not null default false
);

create index if not exists idx_contact_submissions_submitted_at
  on public.contact_submissions (submitted_at desc);

alter table public.contact_submissions enable row level security;

-- Allow public visitors to submit the contact form
create policy "Allow anonymous contact inserts"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Allow signed-in team users to review messages in dashboard/admin tools
create policy "Allow authenticated read contact submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (true);

-- Optional: allow authenticated users to mark messages as read
create policy "Allow authenticated update contact submissions"
  on public.contact_submissions
  for update
  to authenticated
  using (true)
  with check (true);
