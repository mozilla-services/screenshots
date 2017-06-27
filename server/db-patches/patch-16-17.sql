ALTER TABLE devices DROP COLUMN avatarurl;
ALTER TABLE devices DROP COLUMN nickname;
ALTER TABLE accounts ADD COLUMN avatarurl text;
ALTER TABLE accounts ADD COLUMN nickname text;
