set dotenv-load

migrate:
  cd ./db/migrations && goose postgres $DATABASE_URL up 
