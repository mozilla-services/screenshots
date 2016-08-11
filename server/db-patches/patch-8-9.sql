CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE devices ADD COLUMN secret_hashed TEXT;
UPDATE devices
   SET secret_hashed = 'shaHmac:migrated:' || encode(hmac(secret, 'migrated', 'sha256'), 'hex');
ALTER TABLE devices DROP COLUMN secret;
