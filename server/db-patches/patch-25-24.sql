ALTER TABLE data DROP COLUMN firefox_major_version;
ALTER TABLE data DROP COLUMN firefox_channel;
DROP INDEX firefox_major_version_created;
