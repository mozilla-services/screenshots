ALTER TABLE signing_keys ADD COLUMN scope TEXT;
-- We don't want 'legacy' to actually be the default, we just want to set our existing
-- keys to this scope, and force new keys to have an explicit scope set:
UPDATE signing_keys SET scope = 'legacy';
ALTER TABLE signing_keys ALTER COLUMN scope SET NOT NULL;
