package videodownloader

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
)

func VideoDownloader(url, nameVideo string) (string, error) {
	if nameVideo == "" {
		return "", errors.New("No hay nombre para el video")
	}

	if url == "" {
		return "", errors.New("No hay URL")
	}

	response, err := http.Get(url)
	if err != nil {
		return "", errors.New("error al descargar el video")
	}
	defer response.Body.Close()

	out, err := os.Create(nameVideo + ".mp4")
	if err != nil {
		return "", errors.New("error al crear el archivo MP4")
	}
	defer out.Close()

	_, err = io.Copy(out, response.Body)
	if err != nil {
		return "", errors.New("error al guardar el archivo")
	}

	fmt.Println("Video descargado correctamente!")

	return "video descargado correctamente", nil
}
