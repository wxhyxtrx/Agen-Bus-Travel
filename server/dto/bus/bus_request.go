package busdto

type AddBus struct {
	Name  string `json:"name" form:"name" gorm:"type:text"`
	Kelas string `json:"kelas" form:"kelas" gorm:"type:text"`
}

type UpdateBus struct {
	Name  string `json:"name" form:"name" gorm:"type:text"`
	Kelas string `json:"kelas" form:"kelas" gorm:"type:text"`
}
