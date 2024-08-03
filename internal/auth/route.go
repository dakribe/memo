package auth

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/dakribe/memo/internal/db/db"
	"github.com/dakribe/memo/internal/user"
	"github.com/go-chi/chi/v5"
)

type AuthRoutes struct {
	userSvc    user.UserService
	sessionSvc SessionService
}

func NewAuthRoutes(userSvc user.UserService, sessionSvc SessionService) *AuthRoutes {
	return &AuthRoutes{
		userSvc:    userSvc,
		sessionSvc: sessionSvc,
	}
}

func (a *AuthRoutes) Register(r *chi.Mux) {
	r.Route("/api/auth", func(r chi.Router) {
		r.Post("/register", a.register)
	})
}

type RegisterRequest struct {
	Email    string
	Password string
}

func (a *AuthRoutes) register(w http.ResponseWriter, r *http.Request) {
	var registerRequest RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&registerRequest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = a.userSvc.FindByEmail(context.Background(), registerRequest.Email)
	if err == nil {
		http.Error(w, "user already exists", http.StatusBadRequest)
		return
	}

	hashedPw, err := HashPassword(registerRequest.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userId, err := a.userSvc.Create(context.Background(), db.CreateUserParams{
		Email:          registerRequest.Email,
		HashedPassword: hashedPw,
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	sessionId, err := a.sessionSvc.CreateSession(context.Background(), userId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	c := a.sessionSvc.CreateSessionCookie(sessionId.String())

	http.SetCookie(w, &c)
	w.WriteHeader(http.StatusOK)
}
