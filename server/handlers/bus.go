package handlers

import (
	busdto "bustravel/dto/bus"
	dto "bustravel/dto/result"
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

type handlerBus struct {
	BusRepository repositories.BusRepository
}

func HandlerBus(busRepository repositories.BusRepository) *handlerBus {
	return &handlerBus{busRepository}
}

func (h *handlerBus) BusCSV(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	dataBus := []models.Bus{}

	dataContex := r.Context().Value("fileCSV")
	filepath := dataContex.(string)
	file, err := os.Open(filepath)

	if err != nil {
		log.Fatal(err)
	}

	df := csv.NewReader(file)
	data, _ := df.ReadAll()

	for _, value := range data {
		dataBus = append(dataBus, models.Bus{Name: value[0], Kelas: value[1]})
	}

	var result []models.Bus

	for i := 0; i < len(dataBus); i++ {
		data, _ := h.BusRepository.AddBusCSV(dataBus)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: "Cek Data Bus"}
			json.NewEncoder(w).Encode(response)
			return
		}
		result = data
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: result}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerBus) CreateBus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	request := new(busdto.AddBus)
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

	dataBus := models.Bus{
		Name:  request.Name,
		Kelas: request.Kelas,
	}

	data, err := h.BusRepository.AddBus(dataBus)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: "Cek Data Bus"}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerBus) FindBuss(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	bus, err := h.BusRepository.FindAllBus()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Cek Bus All"}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: bus}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerBus) GetBus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	bus, err := h.BusRepository.FindTransID(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: bus}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerBus) DeleteBus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	bus, err := h.BusRepository.FindTransID(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.BusRepository.DeleteBus(bus)
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

func (h *handlerBus) UpdateBus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(busdto.UpdateBus)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	bus, err := h.BusRepository.FindTransID(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Name != "" {
		bus.Name = request.Name
	}
	if request.Kelas != "" {
		bus.Kelas = request.Kelas
	}

	data, err := h.BusRepository.UpdateBus(bus)
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
