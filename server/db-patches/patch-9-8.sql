-- Note: we can't recover secret, so this is kind of a bad reverse-migration
ALTER TABLE devices ADD COLUMN secret TEXT;
ALTER TABLE devices DROP COLUMN secret_hashed;
