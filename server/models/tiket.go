package models

import "time"

type Tiket struct {
	ID     int       `json:"id" gorm:"primary_key:auto_increment"`
	Jadwal time.Time `json:"jadwal"`
	//========================
	BusID int `json:"bus_id"`
	Bus   Bus `json:"bus" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	//========================
	TerminalAsalID  int       `json:"terminal_asal"`
	TerminalAsal    Terminal   `json:"terminalasal" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	WaktuBerangkat time.Time `json:"waktu_berangkat"`
	//========================
	TerminalTujuanID int       `json:"terminal_tujuan"`
	TerminalTujuan   Terminal   `json:"terminaltujuan" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	WaktuTiba       time.Time `json:"waktu_tiba"`
	//========================
	Harga int    `json:"harga" gorm:"type:int"`
	Stock int    `json:"stock" gorm:"type:int"`
	Kode  string `json:"kode" gorm:"type:text"`
}
