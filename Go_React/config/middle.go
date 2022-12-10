package config

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"strings"
	"syscall"
)

func AuthCookie(context *gin.Context) bool {
	_, err := context.Cookie("hasLogin")
	if err != nil {
		return false
	}
	return true
}

func RemoveFile(oldpath string) string { //跨卷移动
	outcome := strings.Split(oldpath, "\\")
	newpath := "E:\\go_code\\big data\\front\\public\\resource\\img\\" + outcome[len(outcome)-1]
	from, err := syscall.UTF16PtrFromString(oldpath)
	if err != nil {
		fmt.Println(err)
	}
	to, err := syscall.UTF16PtrFromString(newpath)
	if err != nil {
		fmt.Println(err)
	}
	err = syscall.MoveFile(from, to) //windows API
	if err != nil {
		fmt.Println(err)
	}
	return ".\\resource\\img\\" + outcome[len(outcome)-1]
}
