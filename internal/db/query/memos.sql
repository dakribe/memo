-- name: CreateMemo :one
INSERT INTO memos (
  content,
  user_id
) VALUES (
  @content,
  @user_id
)
RETURNING id;

-- name: SelectUserMemos :many
SELECT * FROM memos
WHERE user_id = @user_id;

-- name: DeleteMemo :exec
DELETE FROM memos
WHERE id = @id;
