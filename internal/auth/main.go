package auth

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/dakribe/memo/internal/db/db"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type SessionService struct {
	db *db.Queries
}

func NewSessionService(db *db.Queries) SessionService {
	return SessionService{
		db: db,
	}
}

func newTimestamp(time time.Time) pgtype.Timestamp {
	return pgtype.Timestamp{
		Time: time,
	}
}

func (s *SessionService) CreateSession(ctx context.Context, userId uuid.UUID) (uuid.UUID, error) {
	monthFromNow := time.Now().AddDate(0, 1, 0)
	sessionId, err := s.db.CreateSession(ctx, db.CreateSessionParams{
		UserID:    userId,
		ExpiresAt: newTimestamp(monthFromNow),
	})
	if err != nil {
		return uuid.UUID{}, fmt.Errorf("unable to create session: %w", err)
	}
	return sessionId, nil
}

func (s *SessionService) CreateSessionCookie(value string) http.Cookie {
	maxAge := time.Hour * 24 * 30
	c := http.Cookie{
		Name:     "memo_session",
		Value:    value,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Secure:   false,
		MaxAge:   int(maxAge.Seconds()),
	}

	return c
}
