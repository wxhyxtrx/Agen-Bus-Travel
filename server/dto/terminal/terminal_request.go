package terminaldto

type AddTerminal struct {
	Name string `json:"name" form:"name" gorm:"type:text"`
	Kota string `json:"kota" form:"kota" gorm:"type:text"`
}
type UpdateTerminal struct {
	Name string `json:"name" form:"name" gorm:"type:text"`
	Kota string `json:"kota" form:"kota" gorm:"type:text"`
}
