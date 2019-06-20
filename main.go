package main

import (
    "fmt"
    "os"
	"path/filepath"
	// "encoding/json"
	// "io/ioutil"
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
			fmt.Print(data)
        }
        return nil
	})
// 	file, _ := json.MarshalIndent(data, "", " ")
 
// 	_ = ioutil.WriteFile("test.json", file, 0644)
 }

func main() {
	var input string
	fmt.Print("Enter a valid path")
	fmt.Scanln(&input)
	
    WalkAllFilesInDir(input)
}