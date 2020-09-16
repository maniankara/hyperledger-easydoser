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
	file, err := os.Create("./tls.crt")
	if err != nil {

	}
	defer file.Close()
	fileWriter := bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, data.TLS)
	fileWriter.Flush()
	defer file.Close()
	file, err = os.Create("./ocert.pem")
	if err != nil {

	}
	defer file.Close()
	fileWriter = bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, data.Oc)
	fileWriter.Flush()
	defer file.Close()

	orgs, ls := commitArgBuilder(data.Orgs.Address, data.Orgs.Cert)
	sequence := getCommitSequence(data, orgs)
	cmd := exec.Command("bash", "./bash/peer_commit_chaincode.sh", "--cfg", data.Cfg, "--orderer-address", data.Oa, "--msp-id", data.Mspid, "--msp-config", data.Mspconf, "--tls", "./tls.crt", "--channel", data.Channel, "--chaincode", data.Chaincode, "--policy", data.APolicy, "--sequence", sequence, "--version", data.Version, "--orderer-certificate", "./ocert.pem", "--peer-address", data.Pa, "--orgs", orgs, "--collection", "not_null")
	if data.Policy == "null" {
		cmd = exec.Command("bash", "./bash/peer_commit_chaincode.sh", "--cfg", data.Cfg, "--orderer-address", data.Oa, "--msp-id", data.Mspid, "--msp-config", data.Mspconf, "--tls", "./tls.crt", "--channel", data.Channel, "--chaincode", data.Chaincode, "--policy", data.APolicy, "--sequence", sequence, "--version", data.Version, "--orderer-certificate", "./ocert.pem", "--peer-address", data.Pa, "--orgs", orgs, "--collection", "null")

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
		return
	}
	fmt.Println(out.String())
	s := fmt.Sprintf("%s", out.String())
	fmt.Println(s)
	os.Remove("./config.json")
	os.Remove("./tls.crt")
	os.Remove("./ocert.pem")
	for i := 0; i < len(ls); i++ {
		os.Remove(ls[i])

	}
	fmt.Fprintf(w, "{\"status\":\"done\"}")

}
func getCommitSequence(data CommitData, orgs string) string {
	cmd := exec.Command("bash", "./bash/peer_commit_chaincode.sh", "--cfg", data.Cfg, "--orderer-address", data.Oa, "--msp-id", data.Mspid, "--msp-config", data.Mspconf, "--tls", "./tls.crt", "--channel", data.Channel, "--chaincode", data.Chaincode, "--policy", data.APolicy, "--sequence", "665", "--version", data.Version, "--orderer-certificate", "./ocert.pem", "--peer-address", data.Pa, "--orgs", orgs, "--collection", "not_null")
	if data.Policy == "null" {
		cmd = exec.Command("bash", "./bash/peer_commit_chaincode.sh", "--cfg", data.Cfg, "--orderer-address", data.Oa, "--msp-id", data.Mspid, "--msp-config", data.Mspconf, "--tls", "./tls.crt", "--channel", data.Channel, "--chaincode", data.Chaincode, "--policy", data.APolicy, "--sequence", "665", "--version", data.Version, "--orderer-certificate", "./ocert.pem", "--peer-address", data.Pa, "--orgs", orgs, "--collection", "null")

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
