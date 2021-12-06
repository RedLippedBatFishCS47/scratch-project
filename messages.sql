DROP TABLE messages;
CREATE TABLE messages(
  id        SERIAL PRIMARY KEY,
  username  VARCHAR(100) NOT NULL REFERENCES users,
  content  VARCHAR(100) NULL,
  time_stamp timestamptz,
  edit timestamptz
);

