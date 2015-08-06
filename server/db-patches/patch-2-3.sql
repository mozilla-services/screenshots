ALTER TABLE data ADD url TEXT;
ALTER TABLE data ADD expire_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '2 weeks';
ALTER TABLE data ADD deleted BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE data SET url=(subquery.value::json->>'url') FROM (SELECT value, id FROM data WHERE url IS NULL) AS subquery WHERE data.id = subquery.id;

-- The test value rows are inserted without valid json, so they will still have null urls.
UPDATE data SET url='' WHERE url IS NULL;

ALTER TABLE data ALTER COLUMN url SET NOT NULL;
