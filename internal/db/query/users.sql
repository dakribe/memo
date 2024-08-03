-- name: SelectById :one
SELECT
  id,
  username,
  email,
  hashed_password,
  created_at
FROM
  users
WHERE
  id = @id
LIMIT 1;

-- name: Create :one
INSERT INTO users (
  username,
  email,
  hashed_password
) VALUES (
  @username,
  @email,
  @hashed_password
)
RETURNING id;
