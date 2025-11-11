/*
 * Migration: Update handle_new_user function to use SECURITY DEFINER
 * Purpose: Change the security level from INVOKER to DEFINER for the user profile trigger
 * Affected: public.handle_new_user function
 *
 * Rationale for SECURITY DEFINER:
 * - Triggers on auth.users require elevated privileges to execute
 * - Regular users don't have INSERT privileges on auth.users or user_profiles during signup
 * - The function must run with the privileges of the function owner (superuser/postgres role)
 */

-- Update the function to use SECURITY DEFINER instead of SECURITY INVOKER
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
