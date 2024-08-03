-- +goose Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  username VARCHAR(32),
  email VARCHAR NOT NULL UNIQUE,
  hashed_password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id UUID references users (id) NOT NULL,
  expires_at TIMESTAMP
);

-- +goose Down
DROP TABLE sessions;

DROP TABLE users;

DROP EXTENSION IF EXISTS "uuid-ossp";
