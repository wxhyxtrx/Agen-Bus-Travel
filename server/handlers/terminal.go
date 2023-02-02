package handlers

import (
	dto "bustravel/dto/result"
	terminaldto "bustravel/dto/terminal"
	"bustravel/models"
	"bustravel/repositories"
	"encoding/csv"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type handlerTerminal struct {
	TerminalRepository repositories.TerminalRepository
}

func HandlerTerminal(terminalRepository repositories.TerminalRepository) *handlerTerminal {
	return &handlerTerminal{terminalRepository}
}

func (h *handlerTerminal) TerminalCSV(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	dataTerminal := []models.Terminal{}

	dataContex := r.Context().Value("fileCSV")
	filepath := dataContex.(string)
	file, err := os.Open(filepath)

	if err != nil {
		log.Fatal(err)
	}

	df := csv.NewReader(file)
	data, _ := df.ReadAll()

	for _, value := range data {
		dataTerminal = append(dataTerminal, models.Terminal{Name: value[0], Kota: value[1]})
	}

	var result []models.Terminal

	for i := 0; i < len(dataTerminal); i++ {
		data, _ := h.TerminalRepository.AddTerminalCSV(dataTerminal)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: "Cek Data Terminal"}
			json.NewEncoder(w).Encode(response)
			return
		}
		result = data
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: result}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTerminal) CreateTerminal(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	request := new(terminaldto.AddTerminal)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Cek Dto Request"}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	dataTerminal := models.Terminal{
		Name: request.Name,
		Kota: request.Kota,
	}

	data, err := h.TerminalRepository.AddTerminal(dataTerminal)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: "Cek Data Terminal"}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTerminal) FindTerminals(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	terminal, err := h.TerminalRepository.FindAllTerminal()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Cek Terminal All"}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: terminal}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTerminal) GetTerminal(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	terminal, err := h.TerminalRepository.FindTerminalID(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: terminal}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTerminal) DeleteTerminal(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	terminal, err := h.TerminalRepository.FindTerminalID(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.TerminalRepository.DeleteTerminal(terminal)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTerminal) UpdateTerminal(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(terminaldto.UpdateTerminal)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	terminal, err := h.TerminalRepository.FindTerminalID(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Name != "" {
		terminal.Name = request.Name
	}
	if request.Kota != "" {
		terminal.Kota = request.Kota
	}

	data, err := h.TerminalRepository.UpdateTerminal(terminal)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}
