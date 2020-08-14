package commands

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strings"
)

func CommitChaincode(w http.ResponseWriter, r *http.Request) {
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
	if data.Policy != "null" {
		file, err := os.Create("./config.json")
		if err != nil {

		}
		defer file.Close()
		fileWriter := bufio.NewWriter(file)
		fmt.Fprintln(fileWriter, data.Policy)
		fileWriter.Flush()
		fmt.Println(string(data.Policy))
	}

	orgs := commitArgBuilder(data.Orgs.Address, data.Orgs.Cert)
	sequence := getCommitSequence(data, orgs)
	cmd := exec.Command("bash", "./bash/peer_commit_chaincode.sh", "--cfg", data.Cfg, "--orderer-address", data.Oa, "--msp-id", data.Mspid, "--msp-config", data.Mspconf, "--tls", data.TLS, "--channel", data.Channel, "--chaincode", data.Chaincode, "--policy", data.APolicy, "--sequence", sequence, "--version", data.Version, "--orderer-certificate", data.Oc, "--peer-address", data.Pa, "--orgs", orgs, "--collection", "not_null")
	if data.Policy == "null" {
		cmd = exec.Command("bash", "./bash/peer_commit_chaincode.sh", "--cfg", data.Cfg, "--orderer-address", data.Oa, "--msp-id", data.Mspid, "--msp-config", data.Mspconf, "--tls", data.TLS, "--channel", data.Channel, "--chaincode", data.Chaincode, "--policy", data.APolicy, "--sequence", sequence, "--version", data.Version, "--orderer-certificate", data.Oc, "--peer-address", data.Pa, "--orgs", orgs, "--collection", "null")

	}

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
	cmd := exec.Command("bash", "./bash/peer_commit_chaincode.sh", "--cfg", data.Cfg, "--orderer-address", data.Oa, "--msp-id", data.Mspid, "--msp-config", data.Mspconf, "--tls", data.TLS, "--channel", data.Channel, "--chaincode", data.Chaincode, "--policy", data.APolicy, "--sequence", "665", "--version", data.Version, "--orderer-certificate", data.Oc, "--peer-address", data.Pa, "--orgs", orgs, "--collection", "not_null")
	if data.Policy == "null" {
		cmd = exec.Command("bash", "./bash/peer_commit_chaincode.sh", "--cfg", data.Cfg, "--orderer-address", data.Oa, "--msp-id", data.Mspid, "--msp-config", data.Mspconf, "--tls", data.TLS, "--channel", data.Channel, "--chaincode", data.Chaincode, "--policy", data.APolicy, "--sequence", "665", "--version", data.Version, "--orderer-certificate", data.Oc, "--peer-address", data.Pa, "--orgs", orgs, "--collection", "null")

	}
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
