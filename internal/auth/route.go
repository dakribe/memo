package auth

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/dakribe/memo/internal/db/db"
	"github.com/dakribe/memo/internal/rest"
	"github.com/dakribe/memo/internal/user"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
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
		r.Post("/login", a.login)

		r.Group(func(r chi.Router) {
			r.Use(SessionMiddleware(&a.sessionSvc))
			r.Post("/signout", a.singOut)
			r.Get("/me", a.me)
		})
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
		render.Render(w, r, rest.InvalidRequest(err))
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

type LoginRequest struct {
	Email    string
	Password string
}

func (a *AuthRoutes) login(w http.ResponseWriter, r *http.Request) {
	var loginRequest LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	u, err := a.userSvc.FindByEmail(context.Background(), loginRequest.Email)
	if err != nil {
		http.Error(w, "invalid email", http.StatusBadRequest)
		return
	}

	validPw := CheckPassword(loginRequest.Password, u.HashedPassword)
	if !validPw {
		http.Error(w, "invalid password", http.StatusBadRequest)
		return
	}

	sessionId, err := a.sessionSvc.CreateSession(context.Background(), u.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	c := a.sessionSvc.CreateSessionCookie(sessionId.String())

	http.SetCookie(w, &c)
	w.WriteHeader(http.StatusOK)
}

func (a *AuthRoutes) singOut(w http.ResponseWriter, r *http.Request) {
}

func (a *AuthRoutes) me(w http.ResponseWriter, r *http.Request) {
	session, ok := r.Context().Value("session").(db.GetSessionRow)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return

	}
	res := SessionResponse{
		Email:  session.Email,
		UserId: session.UserID.String(),
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}
