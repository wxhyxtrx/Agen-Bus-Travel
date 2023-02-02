package database

import (
	"fmt"
	"bustravel/models"
	"bustravel/pkg/connection"
)

func RunMigration() {
	err := connection.DB.AutoMigrate(
		&models.User{},
		&models.Penumpang{},
		&models.Terminal{},
		&models.Bus{},
		&models.Tiket{},
		&models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Failed! Create Table to Database")
	}
	fmt.Println("Create Table Success")
}
