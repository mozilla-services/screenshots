-- pg-patcher runs migrations in transactions. However, ALTER TYPE ... ADD VALUE
-- cannot be executed inside a transaction block. We will swap out the enum type
-- with a new one instead.
ALTER TYPE shot_block_type RENAME TO old_shot_block_type;
CREATE TYPE shot_block_type AS ENUM ('none', 'dmca', 'abuse', 'usererror', 'watchdog');
ALTER TABLE data ALTER COLUMN block_type DROP DEFAULT;
ALTER TABLE data ALTER COLUMN block_type TYPE shot_block_type USING block_type::text::shot_block_type;
ALTER TABLE data ALTER COLUMN block_type SET DEFAULT 'none'::shot_block_type;
DROP TYPE old_shot_block_type;
