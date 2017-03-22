ALTER TABLE devices DROP COLUMN last_addon_version;
ALTER TABLE devices DROP COLUMN last_login;
ALTER TABLE devices DROP COLUMN created;
ALTER TABLE devices DROP COLUMN session_count;

DROP TABLE device_activity;
