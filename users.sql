CREATE TABLE users(
  username  VARCHAR(100) PRIMARY KEY,
  passcode  VARCHAR(100) NOT NULL,
  about_me VARCHAR(100) NULL,
  nickname VARCHAR(100) NULL,
  session_id uuid
);

INSERT INTO users (username, passcode) VALUES ('test', 'password123');




