package repositories

import (
	"bustravel/models"
	"time"

	"gorm.io/gorm"
)

type TiketRepository interface {
	CreateTiket(tiket models.Tiket) (models.Tiket, error)
	FilterTiket(asal int, tujuan int, jadwal time.Time) ([]models.Tiket, error)
	FindTiket() ([]models.Tiket, error)
	GetTiket(ID int) (models.Tiket, error)
	Deletetiket(tiket models.Tiket) (models.Tiket, error)
	//========Terminal===============
	FilterKotaTerminal(kota string) (models.Terminal, error)
	// ======TRANSACTION============
	CreateTrans(transaction models.Transaction) (models.Transaction, error)
}

func RepositoryTiket(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTiket(tiket models.Tiket) (models.Tiket, error) {
	err := r.db.Create(&tiket).Error
	return tiket, err
}
func (r *repository) FindTiket() ([]models.Tiket, error) {
	var tiket []models.Tiket
	err := r.db.Preload("Bus").Preload("TerminalAsal").Preload("TerminalTujuan").Order("id DESC").Find(&tiket).Error

	return tiket, err
}
func (r *repository) FilterTiket(asal int, tujuan int, jadwal time.Time) ([]models.Tiket, error) {
	var tiket []models.Tiket
	err := r.db.Preload("Bus").Preload("TerminalAsal").Preload("TerminalTujuan").Where("terminal_asal_id = ? AND terminal_tujuan_id = ? AND jadwal = ?", asal, tujuan, jadwal).Find(&tiket).Error

	return tiket, err
}
func (r *repository) GetTiket(ID int) (models.Tiket, error) {
	var tiket models.Tiket
	err := r.db.First(&tiket, ID).Error

	return tiket, err
}
func (r *repository) Deletetiket(tiket models.Tiket) (models.Tiket, error) {
	err := r.db.Delete(&tiket).Error
	return tiket, err
}

// =============Terminal==============
func (r *repository) FilterKotaTerminal(kota string) (models.Terminal, error) {
	var terminal models.Terminal
	err := r.db.Where("name = ?", kota).First(&terminal).Error
	return terminal, err
}

// ==========TRANSACTION=============
func (r *repository) CreateTrans(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error
	return transaction, err
}

func (r *repository) HistoryTransTiket(user int) ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("Tiket").Preload("Tiket.Bus").Preload("User").Where("status =? AND user_id = ?", "pending", user).Find(&transaction).Error
	return transaction, err
}
