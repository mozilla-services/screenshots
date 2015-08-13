
ALTER TABLE data DROP CONSTRAINT data_deviceid_fkey;
ALTER TABLE data ADD CONSTRAINT data_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES devices (id) ON DELETE CASCADE;
