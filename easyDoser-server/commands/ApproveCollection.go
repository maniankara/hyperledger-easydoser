package commands

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"regexp"
	"strings"
)

func ApprovePC(w http.ResponseWriter, r *http.Request) {
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
	if config.Policy != "null" {
		file, err := os.Create("./config.json")
		if err != nil {

		}
		defer file.Close()
		fileWriter := bufio.NewWriter(file)
		fmt.Fprintln(fileWriter, config.Policy)
		fileWriter.Flush()
		fmt.Println(string(config.Policy))
	}
	file, err := os.Create("./tls.crt")
	if err != nil {

	}
	defer file.Close()
	fileWriter := bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, config.TLS)
	fileWriter.Flush()
	defer file.Close()
	file, err = os.Create("./ocert.pem")
	if err != nil {

	}
	defer file.Close()
	fileWriter = bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, config.Oc)
	fileWriter.Flush()
	defer file.Close()
	sequence := getSequence(config)
	fmt.Println(string(sequence))

	cmd := exec.Command("bash", "./bash/peer_approve_collection.sh", "--cfg", config.Cfg, "--orderer-address", config.Oa, "--msp-id", config.Mspid, "--msp-config", config.Mspconf, "--tls-cert", "./tls.crt", "--channel", config.Channel, "--chaincode", config.Chaincode, "--policy", config.APolicy, "--sequence", sequence, "--version", config.Version, "--orderer-certificate", "./ocert.pem", "--filename", "config.json", "--peer-address", config.Pa)
	if config.Policy == "null" {
		cmd = exec.Command("bash", "./bash/peer_approve_collection.sh", "--cfg", config.Cfg, "--orderer-address", config.Oa, "--msp-id", config.Mspid, "--msp-config", config.Mspconf, "--tls-cert", "./tls.crt", "--channel", config.Channel, "--chaincode", config.Chaincode, "--policy", config.APolicy, "--sequence", sequence, "--version", config.Version, "--orderer-certificate", "./ocert.pem", "--filename", "null", "--peer-address", config.Pa)

	}

	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	cmderr := cmd.Run()
	if cmderr != nil {
		reg, err := regexp.Compile("[^a-zA-Z0-9]+")
		if err != nil {
			log.Fatal(err)
		}
		str := reg.ReplaceAllString(stderr.String(), " ")
		fmt.Println(fmt.Sprint(err) + ": " + "{\"error\":\"" + str + "\"}")
		fmt.Fprintf(w, "{\"status\":\""+str+"\"}")
		if config.Policy != "null" {
			os.Remove("./config.json")
		}
		os.Remove("./tls.crt")
		os.Remove("././ocert.pem")
		return
	}

	fmt.Println("Result: " + out.String())
	if config.Policy != "null" {
		os.Remove("./config.json")
	}
	os.Remove("./tls.crt")
	os.Remove("././ocert.pem")
	fmt.Fprintf(w, "{\"status\":\"done\"}")

}
func getSequence(conf updateConfig) string {
	cmd := exec.Command("bash", "./bash/peer_get_sequence.sh", "--cfg", conf.Cfg, "--orderer-address", conf.Oa, "--msp-id", conf.Mspid, "--msp-config", conf.Mspconf, "--tls-cert", "./tls.crt", "--channel", conf.Channel, "--chaincode", conf.Chaincode, "--policy", conf.APolicy, "--sequence", "1", "--version", conf.Version, "--orderer-certificate", "./ocert.pem", "--filename", "config.json", "--peer-address", conf.Pa)
	if conf.Policy == "null" {
		cmd = exec.Command("bash", "./bash/peer_get_sequence.sh", "--cfg", conf.Cfg, "--orderer-address", conf.Oa, "--msp-id", conf.Mspid, "--msp-config", conf.Mspconf, "--tls-cert", "./tls.crt", "--channel", conf.Channel, "--chaincode", conf.Chaincode, "--policy", conf.APolicy, "--sequence", "1", "--version", conf.Version, "--orderer-certificate", "./ocert.pem", "--filename", "null", "--peer-address", conf.Pa)

	}

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
