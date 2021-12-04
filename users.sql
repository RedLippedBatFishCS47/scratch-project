DROP TABLE users;
CREATE TABLE users(
    id        SERIAL PRIMARY KEY,
  username  VARCHAR(100) NOT NULL,
  passcode  VARCHAR(100) NOT NULL
)



