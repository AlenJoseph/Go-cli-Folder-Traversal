package main

import (
    "fmt"
    "os"
	"path/filepath"
	"net/http"
	"io/ioutil"
	"bytes"
	"encoding/json"
)
type FileData struct {
	file_name, file_path string
}
func WalkAllFilesInDir(dir string) error {
    return filepath.Walk(dir, func(path string, info os.FileInfo, e error) error {
        if e != nil {
            return e
        }

        // check if it is a regular file (not dir)
        if info.Mode().IsRegular() {
			
			data:= FileData{
				file_name:info.Name(),
				file_path:path,
			}
			url := "http://localhost:5000/api/filedata/updateinfo"
			fmt.Println("URL:>", url)
		
			locJson, err := json.Marshal(data)
			fmt.Println(locJson)
			req, err := http.NewRequest("POST", url, bytes.NewBuffer(locJson))
			req.Header.Set("X-Custom-Header", "myvalue")
			req.Header.Set("Content-Type", "application/json")
		
			client := &http.Client{}
			resp, err := client.Do(req)
			if err != nil {
				panic(err)
			}
			defer resp.Body.Close()
		
			fmt.Println("response Status:", resp.Status)
			fmt.Println("response Headers:", resp.Header)
			body, _ := ioutil.ReadAll(resp.Body)
			 fmt.Print(body)
			
			
			
		}
        return nil
	})

 }

func main() {
	var input string
	fmt.Print("Enter a valid path")
	fmt.Scanln(&input)
	
    WalkAllFilesInDir(input)
}