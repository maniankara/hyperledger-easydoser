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

func GetChaincodeConfig(w http.ResponseWriter, r *http.Request) {
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
	cmd := exec.Command("bash", "./bash/peer_collection_config.sh", "--cfg", args.Cfg, "--peer-address", args.PeerAddress, "--msp-id", args.MspID, "--msp-config", args.MspConfig, "--tls-cert", "./tls.crt", "--channel", args.Channel, "--chaincode", args.Chaincode)
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
	var result map[string]interface{}
	json.Unmarshal([]byte(s), &result)
	js, _ := json.Marshal(result)
	os.Remove("./tls.crt")
	fmt.Fprintf(w, string(js))

}
