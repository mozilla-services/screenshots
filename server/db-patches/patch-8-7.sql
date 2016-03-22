ALTER TABLE data DROP COLUMN searchable_text;
ALTER TABLE data DROP COLUMN searchable_version;
DROP INDEX IF EXISTS searchable_text_idx;
