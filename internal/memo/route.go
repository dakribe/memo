package memo

import (
	"encoding/json"
	"net/http"

	"github.com/dakribe/memo/internal/auth"
	"github.com/dakribe/memo/internal/db/db"
	"github.com/dakribe/memo/internal/rest"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type MemoRoutes struct {
	memoSvc    MemoService
	sessionSvc *auth.SessionService
}

func NewMemoRoutes(memoSvc MemoService, sessionSvc *auth.SessionService) *MemoRoutes {
	return &MemoRoutes{
		memoSvc:    memoSvc,
		sessionSvc: sessionSvc,
	}
}

func (m *MemoRoutes) Register(r *chi.Mux) {
	r.Route("/api/memos", func(r chi.Router) {
		r.Use(auth.SessionMiddleware(m.sessionSvc))
		r.Post("/", m.create)
		r.Get("/{userId}", m.list)
	})
}

type CreateMemoReq struct {
	Content string `json:"content"`
}

func (m *MemoRoutes) create(w http.ResponseWriter, r *http.Request) {
	session, ok := r.Context().Value("session").(db.GetSessionRow)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var createMemoReq CreateMemoReq
	err := json.NewDecoder(r.Body).Decode(&createMemoReq)
	if err != nil {
		render.Render(w, r, rest.InvalidRequest(err))
		return
	}

	id, err := m.memoSvc.Create(db.CreateMemoParams{
		Content: createMemoReq.Content,
		UserID:  session.UserID,
	})
	if err != nil {
		render.Render(w, r, rest.InternalServerError(err))
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(id)
}

type ListMemosRequest struct {
	userId string
}

func (m *MemoRoutes) list(w http.ResponseWriter, r *http.Request) {
	userId := chi.URLParam(r, "userId")

	memos, err := m.memoSvc.List(userId)
	if err != nil {
		http.Error(w, "unable to retreive user memos", http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(memos)
}
