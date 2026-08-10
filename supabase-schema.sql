-- MLBB Middleman Website — Supabase schema
-- Supabase Dashboard -> SQL Editor хэсэгт хуулж Run дарна.

create extension if not exists "pgcrypto";

-- Зарагдаж буй аккаунтуудын хүснэгт
create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  rank text not null,
  skins text not null,
  price text not null,
  image_url text not null,
  cloudinary_public_id text,
  created_at timestamp not null default now()
);

-- Зуучлагчийн профайл зургийн хүснэгт (ганц мөр)
create table if not exists profile (
  id text primary key default 'main',
  image_url text,
  cloudinary_public_id text,
  updated_at timestamp not null default now()
);

create index if not exists accounts_created_at_idx on accounts (created_at desc);
