package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
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
	cmd := exec.Command("sh", "./bash/peercli.sh", "--cfg", arr[0], "--orderer-address", arr[1], "--msp-id", arr[2], "--msp-config", arr[3], "--orderer-certificate", arr[4], "--channel", arr[5], "--filename", filename)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
		fmt.Fprintf(w, "error")
		return
	}
	var result map[string]interface{}
	s := fmt.Sprintf("%s", out.String())
	s = removeCerts(s)
	json.Unmarshal([]byte(s), &result)
	jsP, _ := json.Marshal(result["data"].(map[string]interface{})["data"].([]interface{})[0].(map[string]interface{})["payload"].(map[string]interface{})["data"].(map[string]interface{})["config"].(map[string]interface{}))

	fmt.Fprintf(w, string(jsP))

}
func getChannelList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	arr := getArgsForChannelList(r)
	cmd := exec.Command("bash", "./bash/peer_channel_list.sh", "--cfg", arr[0], "--peer-address", arr[1], "--msp-id", arr[2], "--msp-config", arr[3], "--tls-cert", arr[4])
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
		fmt.Fprintf(w, "error")
		return
	}
	s := fmt.Sprintf("%s", out.String())
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
	cmd := exec.Command("bash", "./bash/peer_cc_name.sh", "--cfg", arr[0], "--peer-address", arr[1], "--msp-id", arr[2], "--msp-config", arr[3], "--tls-cert", arr[4], "--channel", arr[5])
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
		fmt.Fprintf(w, "error")
		return
	}
	s := fmt.Sprintf("%s", out.String())
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
	cmd := exec.Command("bash", "./bash/peer_collection_config.sh", "--cfg", arr[0], "--peer-address", arr[1], "--msp-id", arr[2], "--msp-config", arr[3], "--tls-cert", arr[4], "--channel", arr[5], "--chaincode", arr[6])
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()

	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
	}
	s := fmt.Sprintf("%s", out.String())
	var result map[string]interface{}
	json.Unmarshal([]byte(s), &result)
	js, _ := json.Marshal(result)

	fmt.Fprintf(w, string(js))

}
func getSequence(conf updateConfig) string {

	cmd := exec.Command("bash", "./bash/peer_get_sequence.sh", "--cfg", conf.Cfg, "--orderer-address", conf.Oa, "--msp-id", conf.Mspid, "--msp-config", conf.Mspconf, "--tls-cert", conf.TLS, "--channel", conf.Channel, "--chaincode", conf.Chaincode, "--policy", conf.APolicy, "--sequence", "1", "--version", conf.Version, "--orderer-certificate", conf.Oc, "--filename", "config.json", "--peer-address", conf.Pa)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
		seq := strings.Split(stderr.String(), "next available sequence number")
		//fmt.Fprintf(w, strings.Trim(seq[1], " "))
		return strings.Trim(seq[1], " ")
	}
	fmt.Println("Result: " + out.String())
	return ("665")

}
func approvePC(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var config updateConfig
	err := json.NewDecoder(r.Body).Decode(&config)
	if err != nil {
		fmt.Println(err.Error())
		fmt.Printf("%s", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	file, err := os.Create("./config.json")
	if err != nil {

	}
	defer file.Close()
	fileWriter := bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, config.Policy)
	fileWriter.Flush()
	fmt.Println(string(config.Policy))

	sequence := getSequence(config)
	fmt.Println(string(sequence))
	cmd := exec.Command("bash", "./bash/peer_approve_collection.sh", "--cfg", config.Cfg, "--orderer-address", config.Oa, "--msp-id", config.Mspid, "--msp-config", config.Mspconf, "--tls-cert", config.TLS, "--channel", config.Channel, "--chaincode", config.Chaincode, "--policy", config.APolicy, "--sequence", sequence, "--version", config.Version, "--orderer-certificate", config.Oc, "--filename", "config.json", "--peer-address", config.Pa)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	cmderr := cmd.Run()
	if cmderr != nil {

		fmt.Println(stderr.String())
		fmt.Fprintf(w, "{\"status\":\"{\""+stderr.String()+"\"}}")
		return
	}
	fmt.Println("Result: " + out.String())
	os.Remove("./config.json")
	fmt.Fprintf(w, "{\"status\":\"done\"}")

}

func checkCommitReady(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var args updateConfig
	err := json.NewDecoder(r.Body).Decode(&args)
	if err != nil {
		fmt.Println(err.Error())
		fmt.Printf("%s", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	file, err := os.Create("./commit.json")
	if err != nil {

	}
	defer file.Close()
	fileWriter := bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, args.Policy)
	fileWriter.Flush()
	fmt.Println(string(args.Policy))
	sequence := getSequenceCheck(args)
	cmd := exec.Command("bash", "./bash/peer_commit_ready.sh", "--cfg", args.Cfg, "--orderer-address", args.Oa, "--msp-id", args.Mspid, "--msp-config", args.Mspconf, "--tls-certificate", args.TLS, "--channel", args.Channel, "--cc", args.Chaincode, "--approval-policy", args.APolicy, "--sequence", sequence, "--version", args.Version, "--orderer-certificate", args.Oc, "--peer-address", args.Pa)

	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	cmderr := cmd.Run()
	if cmderr != nil {

		fmt.Println(stderr.String())
		fmt.Fprintf(w, "{\"status\":\"{\""+stderr.String()+"\"}}")
		return
	}
	fmt.Println(out.String())
	s := fmt.Sprintf("%s", out.String())

	data := strings.Split(s, "approval status by org:")
	orgs := strings.Split(strings.Trim(strings.Trim(data[1], " "), "\n"), "\n")
	orgsStruct := []Org{}
	for _, value := range orgs {
		split := strings.Split(value, ":")
		name := strings.Trim(split[0], " ")
		status := strings.Trim(split[1], " ")
		org := Org{
			Name:   name,
			Status: status,
		}
		orgsStruct = append(orgsStruct, org)
	}
	payload := CommitCheck{
		Orgs: orgsStruct,
	}
	e, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(orgs)
	os.Remove("./config.json")
	fmt.Fprintf(w, string(e))
}
func getSequenceCheck(args updateConfig) string {
	cmd := exec.Command("bash", "./bash/peer_commit_ready.sh", "--cfg", args.Cfg, "--orderer-address", args.Oa, "--msp-id", args.Mspid, "--msp-config", args.Mspconf, "--tls-certificate", args.TLS, "--channel", args.Channel, "--cc", args.Chaincode, "--approval-policy", args.APolicy, "--sequence", "665", "--version", args.Version, "--orderer-certificate", args.Oc, "--peer-address", args.Pa)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	cmderr := cmd.Run()
	if cmderr != nil {
		fmt.Println(fmt.Sprint(cmderr) + ": " + stderr.String())
		seq := strings.Split(stderr.String(), "but new definition must be sequence")
		//fmt.Fprintf(w, strings.Trim(seq[1], " "))
		return strings.Trim(seq[1], " ")

	}
	fmt.Println("Result: " + out.String())
	return ("665")
}
func commitChaincode(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var data CommitData
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		fmt.Println(err.Error())
		fmt.Printf("%s", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	file, err := os.Create("./config.json")
	if err != nil {

	}
	defer file.Close()
	fileWriter := bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, data.Policy)
	fileWriter.Flush()
	fmt.Println(string(data.Policy))

	orgs := commitArgBuilder(data.Orgs.Address, data.Orgs.Cert)
	sequence := getCommitSequence(data, orgs)
	cmd := exec.Command("bash", "./bash/peer_commit_chaincode.sh", "--cfg", data.Cfg, "--orderer-address", data.Oa, "--msp-id", data.Mspid, "--msp-config", data.Mspconf, "--tls", data.TLS, "--channel", data.Channel, "--chaincode", data.Chaincode, "--policy", data.APolicy, "--sequence", sequence, "--version", data.Version, "--orderer-certificate", data.Oc, "--peer-address", data.Pa, "--orgs", orgs)

	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	cmderr := cmd.Run()
	if cmderr != nil {

		fmt.Println("Error:" + stderr.String())
		fmt.Fprintf(w, "{\"status\":\"something went wrong\"}")
		return
	}
	fmt.Println(out.String())
	s := fmt.Sprintf("%s", out.String())
	fmt.Println(s)
	os.Remove("./config.json")
	fmt.Fprintf(w, "{\"status\":\"done\"}")

}
func getCommitSequence(data CommitData, orgs string) string {
	cmd := exec.Command("bash", "./bash/peer_commit_chaincode.sh", "--cfg", data.Cfg, "--orderer-address", data.Oa, "--msp-id", data.Mspid, "--msp-config", data.Mspconf, "--tls", data.TLS, "--channel", data.Channel, "--chaincode", data.Chaincode, "--policy", data.APolicy, "--sequence", "665", "--version", data.Version, "--orderer-certificate", data.Oc, "--peer-address", data.Pa, "--orgs", orgs)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	cmderr := cmd.Run()
	if cmderr != nil {
		fmt.Println(fmt.Sprint(cmderr) + ": " + stderr.String())
		seq := strings.Split(stderr.String(), "but new definition must be sequence")
		//fmt.Fprintf(w, strings.Trim(seq[1], " "))
		return strings.Trim(seq[1], " ")

	}
	fmt.Println("Result: " + out.String())
	return ("665")
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
	router.HandleFunc("/approve", approvePC).Methods("POST")
	router.HandleFunc("/check", checkCommitReady).Methods("POST")
	router.HandleFunc("/commit", commitChaincode).Methods("POST")

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
//Channel List
////////////////////
// TO BE DELETED
// cfg := "/mnt/265C6B275C6AF14B/fabric/config"
// address := "localhost:7051"
// o_address := "localhost:7050"
// oca := "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"
// mspId := "Org1MSP"
// mspconfig := "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
// tls := "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"
// policy := `OR('Org1MSP.member','Org2MSP.member')`
	// policy := `OR('Org1MSP.member','Org2MSP.member')`
	// peer_list := []string{"localhost:7051", "localhost:9051"}
	// cert_list := []string{"/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt", "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt"}
	//orgs := `--peerAddresses localhost:7051 --tlsRootCertFiles /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt`

////////////
//Channel Info
// to be removed
////////////////
