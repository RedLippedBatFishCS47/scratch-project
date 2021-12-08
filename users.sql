CREATE TABLE users(
  username  VARCHAR(100) PRIMARY KEY,
  passcode  VARCHAR(100) NOT NULL,
  session_id uuid
);

INSERT INTO users (username, passcode) VALUES ('test', 'password123');




