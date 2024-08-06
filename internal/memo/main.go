package memo

import (
	"context"
	"fmt"

	"github.com/dakribe/memo/internal/db/db"
	"github.com/google/uuid"
)

type MemoService struct {
	db *db.Queries
}

func NewMemoService(db *db.Queries) MemoService {
	return MemoService{
		db: db,
	}
}

func (m *MemoService) Create(params db.CreateMemoParams) (uuid.UUID, error) {
	id, err := m.db.CreateMemo(context.Background(), db.CreateMemoParams{
		Content: params.Content,
		UserID:  params.UserID,
	})
	if err != nil {
		return uuid.UUID{}, fmt.Errorf("unable to create memo")
	}

	return id, nil
}

func (m *MemoService) List(userId string) ([]db.Memos, error) {
	id, err := uuid.Parse(userId)
	if err != nil {
		return []db.Memos{}, fmt.Errorf("unable to parse uuid url param")
	}
	memos, err := m.db.SelectUserMemos(context.Background(), id)
	if err != nil {
		return []db.Memos{}, fmt.Errorf("unable to select user memos")
	}

	return memos, nil
}
