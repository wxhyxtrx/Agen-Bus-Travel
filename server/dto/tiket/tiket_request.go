package tiketdto

type AddTiket struct {
	Jadwal         string `json:"jadwal" form:"jadwal"`
	BusID          int    `json:"bus" form:"bus"`
	TerminalAsal   int    `json:"terminalasal" form:"terminalasal"`
	WaktuBerangkat string `json:"waktuberangkat" form:"waktuberangkat"`
	TerminalTujuan int    `json:"terminaltujuan" form:"terminaltujuan"`
	WaktuTiba      string `json:"waktutiba" form:"waktutiba"`
	Harga          int    `json:"harga" form:"harga"`
	Stock          int    `json:"stock" form:"stock"`
}
type FilterTiket struct {
	Jadwal string `json:"jadwal" form:"jadwal"`
	Asal   string `json:"asal" form:"asal"`
	Tujuan string `json:"tujuan" form:"tujuan"`
}

type TransTiket struct {
	Qty int `json:"qty" form:"qty"`
}
