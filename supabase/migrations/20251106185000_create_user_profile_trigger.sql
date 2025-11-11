/*
 * Migration: Create trigger for automatic user_profile creation
 * Purpose: Automatically create a user_profile record when a new user is created in auth.users
 * Affected tables: public.user_profiles, auth.users
 *
 * This migration creates:
 * 1. A trigger function that inserts into user_profiles when a new auth user is created
 * 2. A trigger that fires on auth.users insert events
 */

-- Function to automatically create a user_profile when a new auth user is created
-- SECURITY DEFINER is required here because:
-- 1. Triggers on auth.users are executed with the privileges of the trigger owner
-- 2. Regular users don't have direct INSERT privileges on auth.users
-- 3. This function needs elevated permissions to insert into user_profiles on behalf of the system
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Insert a new user_profile record with data from the auth.users table
  -- Attempts to use full_name from user metadata, falls back to email, then 'Anonymous User'
  insert into public.user_profiles (id, name, image_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email, 'Anonymous User'),
    new.raw_user_meta_data->>'avatar_url'
  );

  return new;
end;
$$;

-- Create trigger to execute the function after a new user is inserted
-- This ensures every auth user automatically gets a corresponding user_profile
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();
