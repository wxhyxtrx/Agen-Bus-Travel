package repositories

import (
	"bustravel/models"

	"gorm.io/gorm"
)

type TerminalRepository interface {
	AddTerminal(terminal models.Terminal) (models.Terminal, error)
	FindAllTerminal() ([]models.Terminal, error)
	FindTerminalID(ID int) (models.Terminal, error)
	UpdateTerminal(terminal models.Terminal) (models.Terminal, error)
	DeleteTerminal(terminal models.Terminal) (models.Terminal, error)
	AddTerminalCSV(terminal []models.Terminal) ([]models.Terminal, error)
}

func RepositoryTerminal(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) AddTerminal(terminal models.Terminal) (models.Terminal, error) {
	err := r.db.Create(&terminal).Error

	return terminal, err
}

func (r *repository) AddTerminalCSV(terminal []models.Terminal) ([]models.Terminal, error) {
	err := r.db.Create(&terminal).Error

	return terminal, err
}

func (r *repository) FindAllTerminal() ([]models.Terminal, error) {
	var terminal []models.Terminal
	err := r.db.Order("kota ASC").Find(&terminal).Error
	return terminal, err
}
func (r *repository) FindTerminalID(ID int) (models.Terminal, error) {
	var terminal models.Terminal
	err := r.db.First(&terminal, ID).Error
	return terminal, err
}

func (r *repository) UpdateTerminal(terminal models.Terminal) (models.Terminal, error) {
	err := r.db.Save(&terminal).Error

	return terminal, err
}

func (r *repository) DeleteTerminal(terminal models.Terminal) (models.Terminal, error) {
	err := r.db.Delete(&terminal).Error
	return terminal, err
}
