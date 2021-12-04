DROP TABLE messages;
CREATE TABLE messages(
  id        SERIAL PRIMARY KEY,
  username  VARCHAR(100) NOT NULL,
  content  VARCHAR(100) NULL,
  time_stamp timestamptz,
  session_id uuid
);

