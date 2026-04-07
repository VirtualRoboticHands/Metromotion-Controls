-- 004_blog.sql
-- Blog / resources content model

create table if not exists public.blog_categories (
  id bigserial primary key,
  slug text not null unique,
  name text not null unique,
  description text
);

create table if not exists public.blog_posts (
  id bigserial primary key,
  slug text not null unique,
  title text not null,
  excerpt text,
  body_md text not null,
  cover_image_url text,
  author_name text,
  reading_time_minutes integer,
  category_id bigint references public.blog_categories(id) on delete set null,
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_tags (
  id bigserial primary key,
  slug text not null unique,
  name text not null unique
);

create table if not exists public.blog_post_tags (
  post_id bigint not null references public.blog_posts(id) on delete cascade,
  tag_id bigint not null references public.blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create index if not exists idx_blog_posts_published_at
  on public.blog_posts (is_published, published_at desc nulls last);

create index if not exists idx_blog_posts_category_id
  on public.blog_posts (category_id);

create index if not exists idx_blog_post_tags_tag_id
  on public.blog_post_tags (tag_id);

create trigger set_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_post_tags enable row level security;

-- Public can read published posts + associated taxonomy
create policy "Public can read blog categories"
  on public.blog_categories
  for select
  to anon, authenticated
  using (true);

create policy "Public can read blog tags"
  on public.blog_tags
  for select
  to anon, authenticated
  using (true);

create policy "Public can read published blog posts"
  on public.blog_posts
  for select
  to anon, authenticated
  using (is_published = true);

create policy "Public can read tag mappings for published posts"
  on public.blog_post_tags
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.blog_posts p
      where p.id = blog_post_tags.post_id
        and p.is_published = true
    )
  );

-- Authenticated users can manage blog content
create policy "Authenticated can manage blog categories"
  on public.blog_categories
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can manage blog posts"
  on public.blog_posts
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can manage blog tags"
  on public.blog_tags
  for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can manage blog post tags"
  on public.blog_post_tags
  for all
  to authenticated
  using (true)
  with check (true);
