ALTER TABLE devices ADD COLUMN last_addon_version TEXT;
ALTER TABLE devices ADD COLUMN last_login TIMESTAMP;
ALTER TABLE devices ADD COLUMN created TIMESTAMP DEFAULT NOW();
ALTER TABLE devices ADD COLUMN session_count INTEGER DEFAULT 0;

CREATE TABLE device_activity (
  deviceid VARCHAR(200) REFERENCES devices (id) ON DELETE CASCADE,
  event_date TIMESTAMP DEFAULT NOW(),
  event_type TEXT,
  event_info TEXT
);
