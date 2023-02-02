package routes

import (
	"bustravel/handlers"
	"bustravel/pkg/connection"
	"bustravel/pkg/middleware"
	"bustravel/repositories"

	"github.com/gorilla/mux"
)

func TerminalRoutes(r *mux.Router) {
	terminalRepository := repositories.RepositoryTerminal(connection.DB)
	h := handlers.HandlerTerminal(terminalRepository)

	r.HandleFunc("/terminals", h.FindTerminals).Methods("GET")
	r.HandleFunc("/terminal/{id}", h.GetTerminal).Methods("GET")
	r.HandleFunc("/terminal/{id}", middleware.Auth(h.DeleteTerminal)).Methods("DELETE")
	r.HandleFunc("/terminal/{id}", middleware.Auth(h.UpdateTerminal)).Methods("PATCH")
	r.HandleFunc("/terminal", middleware.Auth(h.CreateTerminal)).Methods("POST")
	r.HandleFunc("/csvterminal", middleware.Auth(middleware.UploadFile(h.TerminalCSV))).Methods("POST")
}
