package filedto

type FileRequest struct {
	CSV string `json:"csv" gorm:"type:text"`
}
