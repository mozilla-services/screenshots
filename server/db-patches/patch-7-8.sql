ALTER TABLE data ADD COLUMN searchable_text tsvector;
ALTER TABLE data ADD COLUMN searchable_version INT;
CREATE INDEX searchable_text_idx ON data USING GIN(searchable_text);
