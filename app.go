package main

import (
	"context"
	"fmt"
	"github.com/ddliu/go-httpclient"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetUserImgPath() string {
	dialog, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{})

	if err != nil {
		return ""
	}

	return dialog
}

func (a *App) CommitUserImage(imgPath string, imgName string) string {
	file, err := os.ReadFile(imgPath)

	if err != nil {
		fmt.Println("cannot open file")

		return "cannot open file"
	}

	response, err := httpclient.
		Begin().
		WithHeader("operation", "addimg").
		WithHeader("imagesrc", "images/"+imgName).
		Post("http://localhost:9190", file)

	if err != nil {
		return "无法连接到服务器!"
	}

	if response.Header.Get("result") == "success" {
		return response.Header.Get("result")
	} else {
		return response.Header.Get("reason")
	}
}
