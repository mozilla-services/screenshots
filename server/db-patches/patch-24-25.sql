ALTER TABLE data ADD COLUMN firefox_major_version INT DEFAULT NULL;
ALTER TABLE data ADD COLUMN firefox_channel TEXT DEFAULT NULL;
CREATE INDEX firefox_major_version_created ON data (firefox_major_version, created);
