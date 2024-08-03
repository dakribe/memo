package user

import (
	"context"
	"fmt"

	"github.com/dakribe/memo/internal/db/db"
	"github.com/google/uuid"
)

type UserService struct {
	db *db.Queries
}

func NewUserStore(db *db.Queries) UserService {
	return UserService{
		db: db,
	}
}

func (u *UserService) SelectById(ctx context.Context, id uuid.UUID) {
	u.db.SelectUserById(ctx, id)
}

func (u *UserService) FindByEmail(ctx context.Context, email string) (db.Users, error) {
	user, err := u.db.SelectUserByEmail(ctx, email)
	if err != nil {
		return db.Users{}, fmt.Errorf("unable to find user with specific email: %w", err)
	}
	return user, nil
}

func (u *UserService) Create(ctx context.Context, params db.CreateUserParams) (uuid.UUID, error) {
	userId, err := u.db.CreateUser(ctx, db.CreateUserParams{
		Username:       params.Username,
		Email:          params.Email,
		HashedPassword: params.HashedPassword,
	})
	if err != nil {
		return uuid.UUID{}, fmt.Errorf("unable to create user: %w", err)
	}

	return userId, nil
}
