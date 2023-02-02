package routes

import (
	"bustravel/handlers"
	"bustravel/pkg/connection"
	"bustravel/pkg/middleware"
	"bustravel/repositories"

	"github.com/gorilla/mux"
)

func BusRoutes(r *mux.Router) {
	busRepository := repositories.RepositoryBus(connection.DB)
	h := handlers.HandlerBus(busRepository)

	r.HandleFunc("/buss", h.FindBuss).Methods("GET")
	r.HandleFunc("/bus/{id}", h.GetBus).Methods("GET")
	r.HandleFunc("/bus/{id}", middleware.Auth(h.DeleteBus)).Methods("DELETE")
	r.HandleFunc("/bus/{id}", middleware.Auth(h.UpdateBus)).Methods("PATCH")
	r.HandleFunc("/bus", middleware.Auth(h.CreateBus)).Methods("POST")
	r.HandleFunc("/csvbus", middleware.Auth(middleware.UploadFile(h.BusCSV))).Methods("POST")
}
