package repositories

import (
	"bustravel/models"

	"gorm.io/gorm"
)

type BusRepository interface {
	AddBus(bus models.Bus) (models.Bus, error)
	FindAllBus() ([]models.Bus, error)
	FindTransID(ID int) (models.Bus, error)
	UpdateBus(bus models.Bus) (models.Bus, error)
	DeleteBus(bus models.Bus) (models.Bus, error)
	AddBusCSV(bus []models.Bus) ([]models.Bus, error)
}

func RepositoryBus(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) AddBus(bus models.Bus) (models.Bus, error) {
	err := r.db.Create(&bus).Error

	return bus, err
}
func (r *repository) AddBusCSV(bus []models.Bus) ([]models.Bus, error) {
	err := r.db.Create(&bus).Error

	return bus, err
}
func (r *repository) FindAllBus() ([]models.Bus, error) {
	var bus []models.Bus
	err := r.db.Find(&bus).Error
	return bus, err
}
func (r *repository) FindTransID(ID int) (models.Bus, error) {
	var bus models.Bus
	err := r.db.First(&bus, ID).Error
	return bus, err
}

func (r *repository) UpdateBus(bus models.Bus) (models.Bus, error) {
	err := r.db.Save(&bus).Error

	return bus, err
}

func (r *repository) DeleteBus(bus models.Bus) (models.Bus, error) {
	err := r.db.Delete(&bus).Error
	return bus, err
}
