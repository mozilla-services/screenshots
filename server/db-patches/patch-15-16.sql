CREATE TYPE shot_block_type AS ENUM ('none', 'dmca');
ALTER TABLE data ADD COLUMN block_type shot_block_type DEFAULT 'none' NOT NULL;
