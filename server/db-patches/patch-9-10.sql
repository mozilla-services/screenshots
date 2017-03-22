-- This is a fix for a bad 8->9 migration
ALTER TABLE devices DROP COLUMN IF EXISTS secret;
