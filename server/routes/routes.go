package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	UserRoutes(r)
	AuthRoutes(r)
	BusRoutes(r)
	TerminalRoutes(r)
	TiketRoutes(r)
	TransactionRoutes(r)
}
