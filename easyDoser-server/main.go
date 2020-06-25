package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"strings"

	"github.com/gorilla/mux"
)

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}

func getChannelInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	id := getIdFromRequest(r)
	block := "\"" + id + ".block\""
	out, err := exec.Command("sh", "channel_info.sh", block).Output()
	if err != nil {
		fmt.Printf("%s", err)
	}
	var result map[string]interface{}
	s := fmt.Sprintf("%s", out)
	key := extractValue(s, "values")
	fmt.Printf("%s", key)
	json.Unmarshal([]byte(s), &result)
	// working on orderer data
	jsP, _ := json.Marshal(result["data"].(map[string]interface{})["data"].([]interface{})[0].(map[string]interface{})["payload"].(map[string]interface{})["data"].(map[string]interface{})["config"].(map[string]interface{}))

	fmt.Fprintf(w, string(jsP))

}
func getChannelList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	out, err := exec.Command("./channel_list.sh").Output() //stdout, err := cmd.Output()
	if err != nil {
		fmt.Printf("%s", err)
	}
	s := fmt.Sprintf("%s", out)
	split := strings.Split(s, "Channels peers has joined:")
	temp := strings.Split(split[1], "\r\n")
	//c_list := remove(temp, 0)
	js, er := json.Marshal(temp[1 : len(temp)-1])
	if err != nil {
		fmt.Printf("%s", er)
	}
	fmt.Fprintf(w, string(js))

}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homeLink)
	router.HandleFunc("/channel_info/{id}", getChannelInfo).Methods("GET")
	router.HandleFunc("/channel_list", getChannelList).Methods("GET")

	log.Fatal(http.ListenAndServe(":8080", router))
}
