package main

import (
    "fmt"
    "os"
	"path/filepath"
	"net/http"
	"bytes"
	"encoding/json"
	"time"
	"log"
	"io/ioutil"
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
			fmt.Println("Message: File info Added")
			
			
		}
        return nil
	})

 }
 func MakeRequest() {
	resp, err := http.Get("http://localhost:5000/api/filedata/filestats")
	if err != nil {
		log.Fatalln(err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	log.Println(string(body))
}
func getData(){
	var input string
	fmt.Println("********************************************Go client App************************************************************")
	fmt.Println("HI, What action would you liketo perform")
	fmt.Println("1.Traverse and POST data")
	fmt.Println("2.Retrive File Statistic data")
	fmt.Println("--help.Type --help for Help")
	fmt.Scanln(&input)
	if input=="1"{
		fmt.Println("Enter a valid path for Traversing:")
		fmt.Scanln(&input)
		if input != " "{

		 WalkAllFilesInDir(input)
		 getData()
		} else{

			fmt.Println("Enter a valid path")
			getData()
		}
		
	}else if input=="2"{
		fmt.Println("********************************File Statistics***************************************")
		MakeRequest()
		getData()
	}else if input=="--help"{
		fmt.Println("help messeage")
		getData()
	}else{
		fmt.Println("Enter a valid input")
		getData()
	}
}

func main() {

	getData()
}