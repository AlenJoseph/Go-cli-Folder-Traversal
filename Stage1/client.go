package main

import (
    "fmt"
    "os"
	"path/filepath"
	"net/http"
	"bytes"
	"encoding/json"
	"time"
)
type FileInfo struct {
    Name    string
    Size    int64
	ModTime time.Time
	FilePath string
	Dir string
}

func WalkAllFilesInDir(dir string) error {
    return filepath.Walk(dir, func(path string, info os.FileInfo, e error) error {
        if e != nil {
            return e
        }
		list := []FileInfo{}
		
		
        // check if it is a regular file (not dir)
        if info.Mode().IsRegular() {
			var rootdir = dir
			data := FileInfo{
				Name:info.Name(),
				Size:info.Size(),
				ModTime:info.ModTime(),
				FilePath:path,
				Dir:rootdir,

				
			}
			list = append(list, data)
			output, err := json.Marshal(list)
			
    		if err != nil {
       			 fmt.Print(err)
				}
				
   			url := "http://localhost:5000/api/filedata/updateinfo"
		
			
			req, err := http.NewRequest("POST", url, bytes.NewBuffer(output))
			req.Header.Set("X-Custom-Header", "myvalue")
			req.Header.Set("Content-Type", "application/json")
		
			client := &http.Client{}
			resp, err := client.Do(req)
			if err != nil {
				panic(err)
			}
			defer resp.Body.Close()
		
			fmt.Println("response Status:", resp.Status)
			
			
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