package main

import (
	"log"
	"net/http"
	"os"

	"github.com/dakribe/memo/internal/auth"
	postgres "github.com/dakribe/memo/internal/db"
	"github.com/dakribe/memo/internal/db/db"
	"github.com/dakribe/memo/internal/user"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	pool := postgres.NewPostgres(os.Getenv("DATABASE_URL"))
	db := db.New(pool)

	userStore := user.NewUserStore(db)
	sessionSvc := auth.NewSessionService(db)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(render.SetContentType(render.ContentTypeJSON))

	user.NewUserRoutes(userStore).Register(r)
	auth.NewAuthRoutes(userStore, sessionSvc).Register(r)

	http.ListenAndServe(":3000", r)
}
