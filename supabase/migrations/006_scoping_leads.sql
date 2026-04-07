create extension if not exists pgcrypto;

create table if not exists public.scoping_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  challenge text not null,
  challenge_answers jsonb not null default '{}'::jsonb,
  industry text not null,
  platform text not null,
  timeline text not null,
  free_text text,
  contact_name text not null,
  contact_company text not null,
  contact_email text not null,
  contact_phone text,
  files jsonb not null default '[]'::jsonb,
  report jsonb not null,
  status text not null default 'new'
);
