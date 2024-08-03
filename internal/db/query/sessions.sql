-- name: CreateSession :one
INSERT INTO sessions (
  user_id,
  expires_at
) VALUES (
  @user_id,
  @expires_at
)
RETURNING id;

