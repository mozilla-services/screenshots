-- This is the metadata for pg-patcher (pg-patcher will automatically update
-- this for future updates):
CREATE TABLE property (
    key   TEXT PRIMARY KEY,
    value TEXT
);
INSERT INTO property(key, value) VALUES('patch', 1);

CREATE TABLE accounts (
  id VARCHAR(200) PRIMARY KEY,
  token TEXT
);

CREATE TABLE devices (
  id varchar(200) PRIMARY KEY,
  secret varchar(200) NOT NULL,
  nickname TEXT,
  avatarurl TEXT,
  accountid VARCHAR(200) REFERENCES accounts(id) ON DELETE SET NULL
);

CREATE INDEX devices_accountid_idx ON devices(accountid);

CREATE TABLE data (
  id varchar(120) PRIMARY KEY,
  deviceid varchar(200) REFERENCES devices (id),
  created TIMESTAMP DEFAULT NOW(),
  value TEXT NOT NULL
);

CREATE TABLE signing_keys (
  created TIMESTAMP DEFAULT NOW(),
  key TEXT
);

CREATE TABLE states (
  state VARCHAR(64) PRIMARY KEY,
  deviceid VARCHAR(200) REFERENCES devices(id) ON DELETE CASCADE
);

CREATE INDEX states_deviceid_idx ON states(deviceid);
