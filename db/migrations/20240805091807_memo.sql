-- +goose Up
CREATE TABLE memos (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  user_id uuid references users (id) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  memo_id uuid references memos (id) NOT NULL
);

CREATE TABLE profiles (
  user_id uuid references users (id) PRIMARY KEY,
  bannerImage text,
  bio VARCHAR(255)
);

-- +goose Down
DPOP TABLE profiles;

DROP TABLE likes;

DROP TABLE memos;
