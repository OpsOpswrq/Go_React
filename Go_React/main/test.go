package main

import (
	"back/config"
	"back/controller"
	"back/entity"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"
)

func main() {
	r := gin.Default() // 建立默认路由
	r.POST("/login", func(context *gin.Context) {
		if !config.AuthCookie(context) {
			json := entity.Users{}
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Printf("出错了%v\n", err)
			}
			res := controller.Login(json.Id, json.Password)
			fmt.Println(json.Id)
			if res == 1 {
				context.SetCookie("hasLogin", strconv.Itoa(json.Id), 24*60*60*30, "/", "localhost", false, true)
				context.JSON(http.StatusOK, gin.H{
					"res": 1,
				})
			} else {
				context.JSON(http.StatusOK, gin.H{
					"res": 0,
				})
			}
		} else {
			context.JSON(http.StatusOK, gin.H{
				"res": 1,
			})
		}
	})
	r.GET("/main", func(context *gin.Context) {
		popularGoods := make([]entity.Goods, 100, 100)
		popularGoods = controller.GetPopularGoods()
		context.JSON(http.StatusOK, gin.H{
			"popularGoods": popularGoods,
		})
	})
	r.POST("/register", func(context *gin.Context) {
		json := entity.Users{}
		err := context.BindJSON(&json)
		if err != nil {
			fmt.Println("出错了")
		}
		id := controller.Register(json)
		context.JSON(http.StatusOK, gin.H{
			"id": id,
		})
	})
	r.GET("/enterChart", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			name, _ := strconv.Atoi(res)
			username := controller.GetUsersName(name)
			res_int, _ := strconv.Atoi(res)
			goods := controller.GetGoodsFromChart(res_int)
			context.JSON(http.StatusOK, gin.H{
				"goods": goods,
				"id":    username,
				"login": 0,
			})
		} else {
			context.JSON(http.StatusOK, gin.H{
				"login": 1,
			})
		}
	})
	r.POST("/addAmount", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			json := entity.General{}
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Println("出错了")
			} else {
				id := json.Id
				res_int, _ := strconv.Atoi(res)
				controller.ChangeGoodsAmount(id, res_int, 1)
				name, _ := strconv.Atoi(res)
				username := controller.GetUsersName(name)
				goods := controller.GetGoodsFromChart(res_int)
				context.JSON(http.StatusOK, gin.H{
					"goods": goods,
					"id":    username,
					"login": 0,
				})
			}
		} else {
			context.JSON(http.StatusOK, gin.H{
				"login": 1,
			})
		}
	})
	r.POST("/subAmount", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			json := entity.General{}
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Println("出错了")
			} else {
				id := json.Id
				res_int, _ := strconv.Atoi(res)
				controller.ChangeGoodsAmount(id, res_int, 0)
				name, _ := strconv.Atoi(res)
				username := controller.GetUsersName(name)
				goods := controller.GetGoodsFromChart(res_int)
				context.JSON(http.StatusOK, gin.H{
					"goods": goods,
					"id":    username,
					"login": 0,
				})
			}
		} else {
			context.JSON(http.StatusOK, gin.H{
				"login": 1,
			})
		}
	})
	r.POST("/notChooseIt", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			json := entity.General{}
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Println("出错了")
			} else {
				id := json.Id
				res_int, _ := strconv.Atoi(res)
				controller.NotChooseIt(id, res_int)
				name, _ := strconv.Atoi(res)
				username := controller.GetUsersName(name)
				goods := controller.GetGoodsFromChart(res_int)
				context.JSON(http.StatusOK, gin.H{
					"goods": goods,
					"id":    username,
					"login": 0,
				})
			}
		} else {
			context.JSON(http.StatusOK, gin.H{
				"login": 1,
			})
		}
	})
	r.POST("/addGoods", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			json := entity.General{}
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Println("出错了")
			} else {
				id := json.Id
				res_int, _ := strconv.Atoi(res)
				ans := controller.AddGoods(id, res_int)
				if ans == 0 {
					context.JSON(http.StatusOK, gin.H{
						"res": 0,
					})
				} else if ans == 1 {
					context.JSON(http.StatusOK, gin.H{
						"res": 1,
					})
				} else {
					context.JSON(http.StatusOK, gin.H{
						"res": 2,
					})
				}
			}
		} else {
			context.JSON(http.StatusOK, gin.H{
				"res": 3,
			})
		}
	})
	r.GET("/enterSorder", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			res_int, _ := strconv.Atoi(res)
			controller.InsertToSorderFromCharts(res_int)
			username := controller.GetUsersName(res_int)
			goods := controller.GetGoodsFromChartSorder(res_int)
			user := controller.GetUser(res_int)
			context.JSON(http.StatusOK, gin.H{
				"goods": goods,
				"id":    username,
				"login": 0,
				"user":  user,
			})
		} else {
			context.JSON(http.StatusOK, gin.H{
				"login": 1,
			})
		}
	})
	r.POST("/addAmountSorder", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			json := entity.General{}
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Println("出错了")
			} else {
				id := json.Id
				res_int, _ := strconv.Atoi(res)
				controller.ChangeGoodsAmountSorder(id, res_int, 1)
				username := controller.GetUsersName(res_int)
				goods := controller.GetGoodsFromChartSorder(res_int)
				context.JSON(http.StatusOK, gin.H{
					"goods": goods,
					"id":    username,
					"login": 0,
				})
			}
		} else {
			context.JSON(http.StatusOK, gin.H{
				"login": 1,
			})
		}
	})
	r.POST("/subAmountSorder", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			json := entity.General{}
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Println("出错了")
			} else {
				id := json.Id
				res_int, _ := strconv.Atoi(res)
				controller.ChangeGoodsAmountSorder(id, res_int, 0)
				username := controller.GetUsersName(res_int)
				goods := controller.GetGoodsFromChartSorder(res_int)
				context.JSON(http.StatusOK, gin.H{
					"goods": goods,
					"id":    username,
					"login": 0,
				})
			}
		} else {
			context.JSON(http.StatusOK, gin.H{
				"login": 1,
			})
		}
	})
	r.POST("/notChooseItSorder", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			json := entity.General{}
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Println("出错了")
			} else {
				id := json.Id
				res_int, _ := strconv.Atoi(res)
				controller.NotChooseItSoreder(id, res_int)
				username := controller.GetUsersName(res_int)
				goods := controller.GetGoodsFromChartSorder(res_int)
				context.JSON(http.StatusOK, gin.H{
					"goods": goods,
					"id":    username,
					"login": 0,
				})
			}
		} else {
			context.JSON(http.StatusOK, gin.H{
				"login": 1,
			})
		}
	})
	r.POST("/cancelSorder", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			res_int, _ := strconv.Atoi(res)
			controller.DeleteSorder(res_int)
		}
	})
	r.POST("/orderSorder", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			res_int, _ := strconv.Atoi(res)
			json := entity.Sorder{}
			json.Date = time.Now()
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Println("出错了")
			}
			json.Uid = res_int
			ans := controller.OrderSorder(json)
			if ans == 0 {
				context.JSON(http.StatusOK, gin.H{
					"res": 0,
				})
			} else {
				context.JSON(http.StatusOK, gin.H{
					"res": 1,
				})
			}
		}
	})
	r.POST("/uploadGoods", func(context *gin.Context) {
		json := entity.Goods{}
		err := context.BindJSON(&json)
		if err != nil {
			fmt.Println("出错了")
		}
		json.Img = config.RemoveFile(json.Img)
		res := controller.UploadGoods(json)
		if res == 0 {
			context.JSON(http.StatusOK, gin.H{
				"res": 0,
			})
		} else {
			context.JSON(http.StatusOK, gin.H{
				"res": 1,
			})
		}
	})
	r.POST("/logout", func(context *gin.Context) {
		res, _ := context.Cookie("hasLogin")
		context.SetCookie("hasLogin", res, -1, "/", "localhost", false, true)
	})
	r.POST("/recharge", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			res_int, _ := strconv.Atoi(res)
			json := entity.GeneralMoney{}
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Println("出错了")
			}
			controller.Recharge(json.Money, res_int)
			context.JSON(http.StatusOK, gin.H{
				"login": 0,
			})
		} else {
			context.JSON(http.StatusOK, gin.H{
				"login": 1,
			})
		}
	})
	r.GET("/getUserDetail", func(context *gin.Context) {
		if config.AuthCookie(context) {
			res, _ := context.Cookie("hasLogin")
			res_int, _ := strconv.Atoi(res)
			user := controller.GetUser(res_int)
			context.JSON(http.StatusOK, gin.H{
				"user":  user,
				"login": 0,
			})
		} else {
			context.JSON(http.StatusOK, gin.H{
				"login": 1,
			})
		}
	})
	r.POST("/changeUserDetail", func(context *gin.Context) {
		if config.AuthCookie(context) {
			json := entity.Users{}
			err := context.BindJSON(&json)
			if err != nil {
				fmt.Println("出错了")
			}
			controller.ChangeUserDetail(json)
		}
	})
	r.POST("/getGoodsDetail", func(context *gin.Context) {
		json := entity.Goods{}
		err := context.BindJSON(&json)
		if err != nil {
			fmt.Println("出错了")
		}
		goods := controller.GetPopularGoodsById(json.Id)
		context.JSON(http.StatusOK, gin.H{
			"goods": goods,
		})
	})
	r.POST("/changeGoodsDetail", func(context *gin.Context) {
		json := entity.Goods{}
		err := context.BindJSON(&json)
		if err != nil {
			fmt.Println(err)
		}
		if json.Img == "1" {
			controller.ChangeGoodsDetail(json, 1)
		} else {
			json.Img = config.RemoveFile(json.Img)
			controller.ChangeGoodsDetail(json, 0)
		}
	})
	err := r.Run(":7878") // 监听路由端口
	if err != nil {
		fmt.Printf("出错了%v\n", err)
	}
}
