set dotenv-load

run:
  go run ./cmd/server/main.go

migrate:
  cd ./db/migrations && goose postgres $DATABASE_URL up 

generate:
  cd ./internal/db && sqlc generate
