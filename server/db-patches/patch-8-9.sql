ALTER TABLE devices ADD COLUMN secret_hashed TEXT;
-- This is necessary for migrating a live database that existed at an earlier level
-- This is the only case where we need pgcrypto, and that can make it harder to get this app running
-- Therefore we are commenting out this migration on the assumption that no one in the world has a
-- database with accounts that need migrating
--
--CREATE EXTENSION IF NOT EXISTS pgcrypto;
--UPDATE devices
--   SET secret_hashed = 'shaHmac:migrated:' || encode(hmac(secret, 'migrated', 'sha256'), 'hex');
--ALTER TABLE devices DROP COLUMN secret;
