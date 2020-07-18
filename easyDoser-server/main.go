package main

import (
	"encoding/json"
	"flag"
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
	arr := getIdFromRequest(r)
	filename := "conf.pb"
	out, err := exec.Command("sh", "./bash/peercli.sh", "--cfg", arr[0], "--orderer-address", arr[1], "--msp-id", arr[2], "--msp-config", arr[3], "--orderer-certificate", arr[4], "--channel", arr[5], "--filename", filename).Output()
	if err != nil {
		fmt.Printf("%s", err)
	}
	var result map[string]interface{}
	s := fmt.Sprintf("%s", out)
	s = removeCerts(s)
	json.Unmarshal([]byte(s), &result)
	jsP, _ := json.Marshal(result["data"].(map[string]interface{})["data"].([]interface{})[0].(map[string]interface{})["payload"].(map[string]interface{})["data"].(map[string]interface{})["config"].(map[string]interface{}))

	fmt.Fprintf(w, string(jsP))

}
func getChannelList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	arr := getArgsForChannelList(r)
	out, err := exec.Command("bash", "./bash/peer_channel_list.sh", "--cfg", arr[0], "--peer-address", arr[1], "--msp-id", arr[2], "--msp-config", arr[3], "--tls-cert", arr[4]).Output()
	if err != nil {
		fmt.Printf("%s", err)
	}
	s := fmt.Sprintf("%s", out)
	fmt.Printf("%s", s)
	split := strings.Split(s, "joined:")
	fmt.Printf("%s", split[1])
	temp := strings.Split(split[1], "\n")
	js, er := json.Marshal(temp[1 : len(temp)-1])
	if err != nil {
		fmt.Printf("%s", er)
	}
	fmt.Fprintf(w, string(js))

}
func getChaincodeList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	arr := getArgsForCCList(r)
	out, err := exec.Command("bash", "./bash/peer_cc_name.sh", "--cfg", arr[0], "--peer-address", arr[1], "--msp-id", arr[2], "--msp-config", arr[3], "--tls-cert", arr[4], "--channel", arr[5]).Output()
	if err != nil {
		fmt.Printf("%s", err)
	}
	s := fmt.Sprintf("%s", out)
	split := strings.Split(s, "\n")
	var slice = []string{}
	for i := 1; i <= len(split)-2; i++ {
		temp := strings.Split(split[i], ",")
		final := strings.Split(temp[0], ":")
		fmt.Printf("%s", final)
		slice = append(slice, strings.TrimSpace(final[1]))
	}
	js, er := json.Marshal(slice)
	if err != nil {
		fmt.Printf("%s", er)
	}
	fmt.Fprintf(w, string(js))

}
func getChaincodeConfig(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	arr := getArgsForCConfig(r)
	out, err := exec.Command("bash", "./bash/peer_collection_config.sh", "--cfg", arr[0], "--peer-address", arr[1], "--msp-id", arr[2], "--msp-config", arr[3], "--tls-cert", arr[4], "--channel", arr[5], "--chaincode", arr[6]).Output()
	if err != nil {
		fmt.Printf("%s", err)
	}
	s := fmt.Sprintf("%s", out)
	var result map[string]interface{}
	json.Unmarshal([]byte(s), &result)
	js, _ := json.Marshal(result)

	fmt.Fprintf(w, string(js))

}
func approveNewPolicy(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

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
	router.HandleFunc("/channel_info/{id}", getChannelInfo).Methods("GET")
	router.HandleFunc("/channel_list", getChannelList).Methods("GET")
	router.HandleFunc("/cc_list", getChaincodeList).Methods("GET")
	router.HandleFunc("/cc_config", getChaincodeConfig).Methods("GET")

	log.Fatal(http.ListenAndServe(pt, router))
}

//Channel List
////////////////////
// TO BE DELETED
//cfg := "/mnt/265C6B275C6AF14B/fabric/config"
//address := "localhost:7051"
//mspId := "Org1MSP"
//mspconfig := "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
//tls := "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"
////////////
//Channel Info
// to be removed
////////////////

// cfg := "\"/mnt/265C6B275C6AF14B/fabric/config\""
// address := "\"localhost:7050\""
// mspId := "\"Org1MSP\""
// mspconfig := "\"/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp\""
// oca := "\"/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem\""
//channel := `"mychannel" `

// to be removed
////////////////
