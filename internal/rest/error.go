package rest

import (
	"net/http"

	"github.com/go-chi/render"
)

type ErrorResponse struct {
	Err            error
	HTTPStatusCode int
}

func (e *ErrorResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, e.HTTPStatusCode)
	return nil
}

func InvalidRequest(err error) render.Renderer {
	return &ErrorResponse{
		Err:            err,
		HTTPStatusCode: 400,
	}
}

func UnauthorizedRequest(err error) render.Renderer {
	return &ErrorResponse{
		Err:            err,
		HTTPStatusCode: 401,
	}
}

func InternalServerError(err error) render.Renderer {
	return &ErrorResponse{
		Err:            err,
		HTTPStatusCode: 500,
	}
}
