-- name: CreateSession :one
INSERT INTO sessions (
  user_id,
  expires_at
) VALUES (
  @user_id,
  @expires_at
)
RETURNING id;

-- name: GetSession :one
SELECT
  sessions.id,
  sessions.user_id,
  sessions.expires_at,
  users.email
FROM
  sessions
  JOIN users on sessions.user_id = users.id
WHERE
  sessions.id = @id;

-- name: GetUserSessions :many
SELECT
sessions.id,
sessions.expires_at,
users.email
FROM sessions
JOIN users ON sessions.user_id = users.id
WHERE users.id = @id;

-- name: DeleteSession :exec
DELETE FROM sessions
WHERE id = @id;
