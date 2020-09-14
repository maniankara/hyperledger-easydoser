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
)

func GetEndorsementPolicy(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var args ChannelListStruct
	err := json.NewDecoder(r.Body).Decode(&args)
	file, err := os.Create("./tls.crt")
	if err != nil {

	}
	defer file.Close()
	fileWriter := bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, args.TLSCert)
	fileWriter.Flush()
	defer file.Close()
	file, err = os.Create("./cert.crt")
	if err != nil {

	}
	defer file.Close()
	fileWriter = bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, args.Usercert)
	fileWriter.Flush()
	defer file.Close()
	file, err = os.Create("./priv_sk")
	if err != nil {

	}
	defer file.Close()
	fileWriter = bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, args.Keypath)
	fileWriter.Flush()
	defer file.Close()
	cmd := exec.Command("bash", "./bash/discover_endorsement_policy.sh", "--peer-address", args.PeerAddress, "--msp-id", args.MspID, "--tls", "./tls.crt", "--channel", args.Channel, "--chaincode", args.Chaincode, "--keypath", "./priv_sk", "--user-cert", "./cert.crt")
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err = cmd.Run()

	if err != nil {
		reg, err := regexp.Compile("[^a-zA-Z0-9]+")
		if err != nil {
			log.Fatal(err)
		}
		str := reg.ReplaceAllString(stderr.String(), " ")
		fmt.Println(fmt.Sprint(err) + ": " + "{\"error\":\"" + str + "\"}")
		fmt.Fprintf(w, "{\"error\":\""+str+"\"}")
		return

	}
	s := fmt.Sprintf("%s", out.String())
	os.Remove("./tls.crt")
	os.Remove("./priv_sk")
	os.Remove("./cert.crt")
	fmt.Fprintf(w, s)

}

//{"error":"2020-09-14 113325.115 UTC [main] InitCmd -> ERRO 001 Cannot run peer because cannot init crypto, specified path "/mspconfig" does not exist or cannot be accessed stat /mspconfig no such file or directory"}
