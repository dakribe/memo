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
		Time:  time,
		Valid: true,
	}
}

type SessionResponse struct {
	UserId string `json:"userId"`
	Email  string `json:"email"`
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

func (s *SessionService) GetSession(id uuid.UUID) (db.GetSessionRow, error) {
	sess, err := s.db.GetSession(context.Background(), id)
	if err != nil {
		return db.GetSessionRow{}, fmt.Errorf("unable to get session: %w", err)
	}

	return sess, nil
}

func (s *SessionService) ValidateSession(id uuid.UUID) error {
	sessions, err := s.db.GetUserSessions(context.Background(), id)
	if err != nil {
		return fmt.Errorf("unable to get user sessions: %w", err)
	}

	if len(sessions) == 0 {
		return fmt.Errorf("no sessions exist on the user")
	}

	return nil
}

func (s *SessionService) DeleteSession(id uuid.UUID) error {
	err := s.db.DeleteSession(context.Background(), id)
	if err != nil {
		return fmt.Errorf("unable to delete session: %w", err)
	}
	return nil
}

func isSessionExpired(timestamp pgtype.Timestamp) bool {
	return time.Now().After(timestamp.Time)
}

func SessionMiddleware(s *SessionService) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			sessionCookie, err := r.Cookie("memo_session")
			if err != nil {
				fmt.Println("unable get to session cookie")
				next.ServeHTTP(w, r)
				return
			}

			sessionId, err := uuid.Parse(sessionCookie.Value)
			if err != nil {
				fmt.Println("invalid session ID")
				next.ServeHTTP(w, r)
				return
			}

			session, err := s.GetSession(sessionId)
			exp := isSessionExpired(session.ExpiresAt)
			if exp {
				fmt.Println("session is expired")
				next.ServeHTTP(w, r)
				return
			}

			if err != nil {
				fmt.Println("unable to get session from db: %w", err)
				next.ServeHTTP(w, r)
				return
			}

			ctx := context.WithValue(r.Context(), "session", session)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
