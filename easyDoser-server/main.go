package main

import (
	"easyDoser-server/commands"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}

func main() {
	var port = flag.String("port", "8080", "Port to run the server on")

	var help = flag.Bool("help", false, "help")
	flag.Parse()
	if *help {
		fmt.Printf("%s", "This is a REST server for easyDoser.\nUse --port to set custom port to run the server.\n\nPlease make sure you enter correct port and address for server in REACT app.\n")
		return
	}
	var pt = ":" + string(*port)
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homeLink)
	router.HandleFunc("/channel_info/{id}", commands.GetChannelInfo).Methods("POST")
	router.HandleFunc("/channel_list", commands.GetChannelList).Methods("POST")
	router.HandleFunc("/cc_list", commands.GetChaincodeList).Methods("POST")
	router.HandleFunc("/cc_config", commands.GetChaincodeConfig).Methods("POST")
	router.HandleFunc("/approve", commands.ApprovePC).Methods("POST")
	router.HandleFunc("/check", commands.CheckCommitReady).Methods("POST")
	router.HandleFunc("/commit", commands.CommitChaincode).Methods("POST")
	router.HandleFunc("/endorsement_policy", commands.GetEndorsementPolicy).Methods("POST")

	log.Fatal(http.ListenAndServe(pt, router))
}
