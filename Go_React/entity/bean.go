package entity

import "time"

type Users struct {
	Id       int     `form:"id" json:"id"`
	Username string  `form:"username" json:"username"`
	Password string  `form:"password" json:"password" binding:"required"`
	Phone    string  `form:"phone" json:"phone"`
	Money    float64 `form:"money" json:"money"`
	Email    string  `form:"email" json:"email"`
	Address  string  `form:"address" json:"address"`
}

type Goods struct {
	Id          int     `form:"id" json:"id"`
	Name        string  `form:"name" json:"name"`
	Price       float64 `form:"price" json:"price"`
	Left        int     `form:"left" json:"left"`
	Img         string  `form:"img" json:"img"`
	Description string  `form:"description" json:"description"`
}

type Chart struct {
	Id      int       `form:"id" json:"id"`
	Gid     int       `form:"gid" json:"gid"`
	Uid     int       `form:"uid" json:"uid"`
	Amount  int       `form:"amount" json:"amount" gorm:"default 0"`
	Date    time.Time `form:"date" json:"date"`
	Isavail int       `form:"isavail" json:"isavail"`
}

type GoodsChart struct {
	Id          int     `form:"id" json:"id"`
	Name        string  `form:"name" json:"name"`
	Price       float64 `form:"price" json:"price"`
	Left        int     `form:"left" json:"left"`
	Img         string  `form:"img" json:"img"`
	Amount      int     `form:"amount" json:"amount"`
	Description string  `form:"description" json:"description"`
}

type General struct {
	Id int `form:"id" json:"id"`
}
type GeneralMoney struct {
	Money float64 `form:"money" json:"money"`
}
type Sorderbefore struct {
	Id      int       `form:"id" json:"id"`
	Gid     int       `form:"gid" json:"gid"`
	Uid     int       `form:"uid" json:"uid"`
	Amount  int       `form:"amount" json:"amount" gorm:"default 0"`
	Date    time.Time `form:"date" json:"date"`
	Isavail int       `form:"isavail" json:"isavail"`
}

type Sorder struct {
	Id      int       `form:"id" json:"id"`
	Uid     int       `form:"uid" json:"uid"`
	Phone   string    `form:"phone" json:"phone"`
	Remark  string    `form:"remark" json:"remark"`
	Date    time.Time `form:"date" json:"date"`
	Total   float64   `form:"total" json:"total"`
	Address string    `form:"address" json:"address"`
}
