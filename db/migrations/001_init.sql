-- +goose Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  username VARCHAR(255) NOT NULL,
  valid BOOLEAN NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- +goose Down
DROP TABLE sessions;

DROP TABLE users;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
