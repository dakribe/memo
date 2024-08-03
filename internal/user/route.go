package user

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

type UserRoutes struct {
	store UserStore
}

func NewUserRoutes(store UserStore) *UserRoutes {
	return &UserRoutes{
		store: store,
	}
}

func (u *UserRoutes) Register(r *chi.Mux) {
	r.Route("/api/users", func(r chi.Router) {
		r.Get("/", create)
	})
}

func create(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("User route"))
}
