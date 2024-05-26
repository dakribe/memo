package main

import (
	"fmt"
	"log"
	"os"

	"github.com/dakribe/memo/internal/postgres"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func loadConfig() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	run()
}

func run() {
	loadConfig()

	dbUrl := os.Getenv("DB_URL")

	db, err := postgres.NewPostgres(dbUrl)
	fmt.Println(db)
	if err != nil {
		fmt.Println("Unable to connect")
	}

	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.SetCookie("test_cookie", "test", 3600, "/", "localhost", false, false)
	})
	r.Run()
}
