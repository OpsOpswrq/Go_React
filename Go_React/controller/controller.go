package controller

import (
	"back/entity"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"strings"
	"time"
)

func Login(id int, password string) int {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{CreateBatchSize: 20})
	user := make([]entity.Users, 1, 1)
	db.Where("id = ?", id).First(&user[0])
	if user[0].Password == "" || strings.Trim(user[0].Password, " ") != password {
		return 0
	}
	return 1
}

func GetPopularGoods() []entity.Goods {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{CreateBatchSize: 20})
	goods := make([]entity.Goods, 100, 100)
	db.Where("`left` > ?", 0).Find(&goods)
	return goods
}

func Register(users entity.Users) int {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	result := db.Create(&users)
	FindUsers := make([]entity.Users, 1, 1)
	db.Last(&FindUsers[0])
	if result.RowsAffected > 0 {
		return FindUsers[0].Id
	}
	return -1
}
func GetGoodsFromChart(uid int) []entity.GoodsChart {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	chart_ := make([]entity.Chart, 100, 100)
	db.Where("uid = ? and isavail > 0 and amount > 0", uid).Find(&chart_)
	gid_array := make([]int, 100, 100)
	for index, good := range chart_ {
		gid_array[index] = good.Gid
	}
	goods := make([]entity.Goods, 100, 100)
	db.Where("id in ?", gid_array).Find(&goods)
	chart_goods := make([]entity.GoodsChart, len(goods), len(goods))
	for index, good := range goods {
		chart_goods[index].Id = good.Id
		chart_goods[index].Img = good.Img
		chart_goods[index].Description = good.Description
		chart_goods[index].Left = good.Left
		chart_goods[index].Name = good.Name
		chart_goods[index].Amount = chart_[index].Amount
		chart_goods[index].Price = good.Price
	}
	return chart_goods
}

func GetUsersName(uid int) string {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	user := make([]entity.Users, 1, 1)
	db.Where("id = ?", uid).First(&user[0])
	return user[0].Username
}

func ChangeGoodsAmount(gid int, uid int, op int) {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if op == 1 {
		amount := make([]int, 1, 1)
		db.Raw("select amount from charts where gid = ? and uid = ?", gid, uid).First(&amount[0])
		db.Model(&entity.Chart{}).Where("gid = ? and uid = ?", gid, uid).Update("amount", amount[0]+1)
	} else {
		amount := make([]int, 1, 1)
		db.Raw("select amount from charts where gid = ? and uid = ?", gid, uid).First(&amount[0])
		db.Model(&entity.Chart{}).Where("gid = ? and uid = ?", gid, uid).Update("amount", amount[0]-1)
		if amount[0]-1 == 0 {
			goods := make([]entity.Chart, 1, 1)
			db.Where("uid = ? and gid = ?", uid, gid).Delete(&goods)
			db.Find(&goods)
		}
	}
}

func NotChooseIt(gid int, uid int) {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	goods := make([]entity.Chart, 1, 1)
	db.Where("uid = ? and gid = ?", uid, gid).Delete(&goods)
	db.Find(&goods)
}

func AddGoods(gid int, uid int) int {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	amount := make([]entity.Chart, 1, 1)
	var count int64
	db.Where("gid = ? and uid = ?", gid, uid).Find(&amount).Count(&count)
	if count > 0 {
		db.Model(&entity.Chart{}).Where("gid = ? and uid = ?", gid, uid).Update("amount", amount[0].Amount+1)
		db.Model(&entity.Chart{}).Where("gid = ? and uid = ?", gid, uid).Update("isavail", 1)
		return 0
	} else {
		chart_goods := entity.Chart{}
		chart_goods.Gid = gid
		chart_goods.Uid = uid
		chart_goods.Isavail = 1
		chart_goods.Amount = 1
		chart_goods.Date = time.Now()
		db.Create(&chart_goods)
		return 0
	}
}

func GetUser(uid int) entity.Users {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{CreateBatchSize: 20})
	user := make([]entity.Users, 1, 1)
	db.Where("id = ?", uid).First(&user[0])
	return user[0]
}

func ChangeGoodsAmountSorder(gid int, uid int, op int) {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if op == 1 {
		amount := make([]int, 1, 1)
		db.Raw("select amount from sorderbefores where gid = ? and uid = ?", gid, uid).First(&amount[0])
		fmt.Println("sdme adsadd")
		db.Model(&entity.Sorderbefore{}).Where("gid = ? and uid = ?", gid, uid).Update("amount", amount[0]+1)
	} else {
		amount := make([]int, 1, 1)
		db.Raw("select amount from sorderbefores where gid = ? and uid = ?", gid, uid).First(&amount[0])
		db.Model(&entity.Sorderbefore{}).Where("gid = ? and uid = ?", gid, uid).Update("amount", amount[0]-1)
		if amount[0]-1 == 0 {
			goods := make([]entity.Sorderbefore, 1, 1)
			db.Where("uid = ? and gid = ?", uid, gid).Delete(&goods)
			db.Find(&goods)
		}
	}
}

func NotChooseItSoreder(gid int, uid int) {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	goods := make([]entity.Sorderbefore, 1, 1)
	db.Where("uid = ? and gid = ?", uid, gid).Delete(&goods)
	db.Find(&goods)
}

func GetGoodsFromChartSorder(uid int) []entity.GoodsChart {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	chart_ := make([]entity.Sorderbefore, 100, 100)
	db.Where("uid = ? and isavail > 0 and amount > 0", uid).Find(&chart_)
	gid_array := make([]int, 100, 100)
	for index, good := range chart_ {
		gid_array[index] = good.Gid
	}
	goods := make([]entity.Goods, 100, 100)
	db.Where("id in ?", gid_array).Find(&goods)
	chart_goods := make([]entity.GoodsChart, len(goods), len(goods))
	for index, good := range goods {
		chart_goods[index].Id = good.Id
		chart_goods[index].Img = good.Img
		chart_goods[index].Description = good.Description
		chart_goods[index].Left = good.Left
		chart_goods[index].Name = good.Name
		chart_goods[index].Amount = chart_[index].Amount
		chart_goods[index].Price = good.Price
	}
	return chart_goods
}

func InsertToSorderFromCharts(uid int) {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	sorderBefore := make([]entity.Sorderbefore, 100, 100)
	db.Where("uid = ?", uid).Find(&sorderBefore)
	if len(sorderBefore) == 0 {
		chart_ := make([]entity.Chart, 100, 100)
		db.Where("uid = ?", uid).Find(&chart_)
		sorder := make([]entity.Sorderbefore, len(chart_), len(chart_))
		for index, value := range chart_ {
			sorder[index].Id = value.Id
			sorder[index].Amount = value.Amount
			sorder[index].Gid = value.Gid
			sorder[index].Uid = value.Uid
			sorder[index].Date = time.Now()
			sorder[index].Isavail = value.Isavail
		}
		db.Create(&sorder)
	}
}

func DeleteSorder(uid int) {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	sorder := make([]entity.Sorderbefore, 100, 100)
	db.Where("uid = ?", uid).Delete(&sorder)
	db.Find(&sorder)
}

func OrderSorder(sorder entity.Sorder) int {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{SkipDefaultTransaction: true})
	tx := db.Session(&gorm.Session{SkipDefaultTransaction: true})
	users := make([]entity.Users, 1, 1)
	db.Where("id = ?", sorder.Uid).Find(&users)
	tx.Create(&sorder)
	if users[0].Money < sorder.Total {
		tx.Rollback()
		return 0
	}
	tx.Commit()
	return 1
}

func UploadGoods(goods entity.Goods) int {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{SkipDefaultTransaction: true})
	tx := db.Session(&gorm.Session{SkipDefaultTransaction: true})
	goods_string := make([]entity.Goods, 1, 1)
	db.Where("name = ?", goods.Name).Find(&goods_string)
	tx.Create(&goods)
	if len(goods_string) > 0 {
		tx.Rollback()
		return 0
	} else {
		tx.Commit()
		return 1
	}
}

func Recharge(money float64, uid int) {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	money_before := make([]float64, 1, 1)
	db.Raw("select money from users where id = ?", uid).Find(&money_before[0])
	db.Model(&entity.Users{}).Where("id = ?", uid).Update("money", money+money_before[0])
}

func ChangeUserDetail(user entity.Users) {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	db.Model(&entity.Users{}).Where("id = ?", user.Id).Update("username", user.Username)
	db.Model(&entity.Users{}).Where("id = ?", user.Id).Update("password", user.Password)
	db.Model(&entity.Users{}).Where("id = ?", user.Id).Update("phone", user.Phone)
	db.Model(&entity.Users{}).Where("id = ?", user.Id).Update("email", user.Email)
	db.Model(&entity.Users{}).Where("id = ?", user.Id).Update("address", user.Address)
}

func GetPopularGoodsById(gid int) []entity.Goods {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{CreateBatchSize: 20})
	goods := make([]entity.Goods, 1, 1)
	db.Where("id = ?", gid).Find(&goods)
	return goods
}

func ChangeGoodsDetail(goods entity.Goods, op int) {
	dsn := "root:root@tcp(127.0.0.1:3306)/db_final?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if op == 0 {
		db.Model(&entity.Goods{}).Where("id = ?", goods.Id).Update("name", goods.Name)
		db.Model(&entity.Goods{}).Where("id = ?", goods.Id).Update("price", goods.Price)
		db.Model(&entity.Goods{}).Where("id = ?", goods.Id).Update("`left`", goods.Left)
		db.Model(&entity.Goods{}).Where("id = ?", goods.Id).Update("img", goods.Img)
		db.Model(&entity.Goods{}).Where("id = ?", goods.Id).Update("description", goods.Description)
	} else {
		db.Model(&entity.Goods{}).Where("id = ?", goods.Id).Update("name", goods.Name)
		db.Model(&entity.Goods{}).Where("id = ?", goods.Id).Update("price", goods.Price)
		db.Model(&entity.Goods{}).Where("id = ?", goods.Id).Update("`left`", goods.Left)
		db.Model(&entity.Goods{}).Where("id = ?", goods.Id).Update("description", goods.Description)
	}
}
