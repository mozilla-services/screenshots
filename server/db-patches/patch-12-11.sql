CREATE TABLE device_activity (
    deviceid character varying(200),
    event_date timestamp without time zone DEFAULT now(),
    event_type text,
    event_info text
);
