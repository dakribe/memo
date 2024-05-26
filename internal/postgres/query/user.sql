-- name: GetUser :one
SELECT * FROM users
where id = $1 LIMIT 1;

-- name: CreateUser :one
INSERT INTO users (
  username, hashed_password
) VALUES (
  $1, $2
  )
RETURNING *;
