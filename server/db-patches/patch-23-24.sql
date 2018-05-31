CREATE TABLE watchdog_submissions (
  id SERIAL,
  shot_id CHARACTER VARYING(270) NOT NULL,
  request_id CHARACTER(36) NOT NULL,
  nonce CHARACTER(36) NOT NULL,
  positive_result boolean,
  CONSTRAINT watchdog_pkey PRIMARY KEY (id),
  CONSTRAINT watchdog_shot_id_fkey FOREIGN KEY (shot_id)
      REFERENCES data(id)
      ON UPDATE NO ACTION
      ON DELETE CASCADE
);
