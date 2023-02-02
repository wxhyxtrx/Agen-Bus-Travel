package routes

import (
	"bustravel/handlers"
	"bustravel/pkg/connection"
	"bustravel/repositories"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	userReposetory := repositories.RepositoryUser(connection.DB)
	h := handlers.HandlerUser(userReposetory)

	r.HandleFunc("/users", h.FindAllUser).Methods("GET")
}
