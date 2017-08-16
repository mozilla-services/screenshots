ALTER TABLE devices ADD COLUMN avatarurl text;
ALTER TABLE devices ADD COLUMN nickname text;
ALTER TABLE accounts DROP COLUMN avatarurl;
ALTER TABLE accounts DROP COLUMN nickname;
ALTER TABLE accounts DROP COLUMN email;
