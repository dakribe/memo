package main

import (
	"log"
	"net/http"
	"os"

	postgres "github.com/dakribe/memo/internal/db"
	"github.com/dakribe/memo/internal/db/db"
	"github.com/dakribe/memo/internal/user"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
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

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	user.NewUserRoutes(userStore).Register(r)

	http.ListenAndServe(":3000", r)
}
