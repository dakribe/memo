package user

import (
	"context"

	"github.com/dakribe/memo/internal/db/db"
	"github.com/google/uuid"
)

type UserStore struct {
	db *db.Queries
}

func NewUserStore(db *db.Queries) UserStore {
	return UserStore{
		db: db,
	}
}

func (u *UserStore) SelectById(ctx context.Context, id uuid.UUID) {
	u.db.SelectById(ctx, id)
}

func (u *UserStore) Create(ctx context.Context, params db.CreateParams) {
	u.db.Create(ctx, db.CreateParams{
		Username:       params.Username,
		Email:          params.Email,
		HashedPassword: params.HashedPassword,
	})
}
