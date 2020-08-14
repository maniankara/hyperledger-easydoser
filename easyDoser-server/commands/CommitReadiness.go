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

func CheckCommitReady(w http.ResponseWriter, r *http.Request) {
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
	if args.Policy != "null" {
		file, err := os.Create("./commit.json")
		if err != nil {

		}
		defer file.Close()
		fileWriter := bufio.NewWriter(file)
		fmt.Fprintln(fileWriter, args.Policy)
		fileWriter.Flush()
		fmt.Println(string(args.Policy))
	}

	sequence := getSequenceCheck(args)
	cmd := exec.Command("bash", "./bash/peer_commit_ready.sh", "--cfg", args.Cfg, "--orderer-address", args.Oa, "--msp-id", args.Mspid, "--msp-config", args.Mspconf, "--tls-certificate", args.TLS, "--channel", args.Channel, "--cc", args.Chaincode, "--approval-policy", args.APolicy, "--sequence", sequence, "--version", args.Version, "--orderer-certificate", args.Oc, "--peer-address", args.Pa, "--policy", "not_null")
	if args.Policy == "null" {
		cmd = exec.Command("bash", "./bash/peer_commit_ready.sh", "--cfg", args.Cfg, "--orderer-address", args.Oa, "--msp-id", args.Mspid, "--msp-config", args.Mspconf, "--tls-certificate", args.TLS, "--channel", args.Channel, "--cc", args.Chaincode, "--approval-policy", args.APolicy, "--sequence", sequence, "--version", args.Version, "--orderer-certificate", args.Oc, "--peer-address", args.Pa, "--policy", "null")

	}
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
	if args.Policy != "null" {
		os.Remove("./config.json")
	}

	fmt.Fprintf(w, string(e))
}
func getSequenceCheck(args updateConfig) string {

	cmd := exec.Command("bash", "./bash/peer_commit_ready.sh", "--cfg", args.Cfg, "--orderer-address", args.Oa, "--msp-id", args.Mspid, "--msp-config", args.Mspconf, "--tls-certificate", args.TLS, "--channel", args.Channel, "--cc", args.Chaincode, "--approval-policy", args.APolicy, "--sequence", "665", "--version", args.Version, "--orderer-certificate", args.Oc, "--peer-address", args.Pa, "--policy", "not_null")
	if args.Policy == "null" {
		cmd = exec.Command("bash", "./bash/peer_commit_ready.sh", "--cfg", args.Cfg, "--orderer-address", args.Oa, "--msp-id", args.Mspid, "--msp-config", args.Mspconf, "--tls-certificate", args.TLS, "--channel", args.Channel, "--cc", args.Chaincode, "--approval-policy", args.APolicy, "--sequence", "665", "--version", args.Version, "--orderer-certificate", args.Oc, "--peer-address", args.Pa, "--policy", "null")

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
