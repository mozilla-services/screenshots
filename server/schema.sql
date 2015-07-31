CREATE TABLE accounts (
    id character(32) NOT NULL,
    token character(64)
);
CREATE TABLE data (
    id character varying(120) NOT NULL,
    deviceid character varying(200),
    created timestamp without time zone DEFAULT now(),
    value text,
    body text,
    head text
);
CREATE TABLE devices (
    id character varying(200) NOT NULL,
    secret character varying(200) NOT NULL,
    nickname text,
    avatarurl text,
    accountid character(32)
);
CREATE TABLE images (
    id character varying(200) NOT NULL,
    shotid character varying(200) NOT NULL,
    clipid character varying(200) NOT NULL,
    image bytea NOT NULL,
    contenttype text NOT NULL
);
CREATE TABLE property (
    key text NOT NULL,
    value text
);
CREATE TABLE signing_keys (
    created timestamp without time zone DEFAULT now(),
    key text
);
CREATE TABLE states (
    state character(64) NOT NULL,
    deviceid character varying(200)
);
CREATE TABLE users (
    id character varying(200) NOT NULL,
    secret character varying(200) NOT NULL,
    nickname text,
    avatarurl text
);
ALTER TABLE ONLY accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY data
    ADD CONSTRAINT data_pkey PRIMARY KEY (id);
ALTER TABLE ONLY devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);
ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);
ALTER TABLE ONLY property
    ADD CONSTRAINT property_pkey PRIMARY KEY (key);
ALTER TABLE ONLY states
    ADD CONSTRAINT states_pkey PRIMARY KEY (state);
ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE INDEX device_accountid_idx ON devices USING btree (accountid);
CREATE INDEX devices_accountid_idx ON devices USING btree (accountid);
CREATE INDEX state_deviceid_idx ON states USING btree (deviceid);
CREATE INDEX states_deviceid_idx ON states USING btree (deviceid);
ALTER TABLE ONLY data
    ADD CONSTRAINT data_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES devices(id);
ALTER TABLE ONLY devices
    ADD CONSTRAINT devices_accountid_fkey FOREIGN KEY (accountid) REFERENCES accounts(id) ON DELETE SET NULL;
ALTER TABLE ONLY images
    ADD CONSTRAINT images_shotid_fkey FOREIGN KEY (shotid) REFERENCES data(id) ON DELETE CASCADE;
ALTER TABLE ONLY states
    ADD CONSTRAINT states_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES devices(id) ON DELETE CASCADE;
-- pg-patch version: 2
