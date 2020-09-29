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

	"github.com/gorilla/mux"
)

func GetChannelInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	id := mux.Vars(r)["id"]
	var args ChannelListStruct
	err := json.NewDecoder(r.Body).Decode(&args)
	file, err := os.Create("./ocert.pem")
	if err != nil {

	}
	defer file.Close()
	fileWriter := bufio.NewWriter(file)
	fmt.Fprintln(fileWriter, args.OCerts)
	fileWriter.Flush()
	defer file.Close()
	filename := "conf.pb"
	str := "false"
	if args.Docker == "true" {
		str = "true"
	}
	cmd := exec.Command("sh", "./bash/peercli.sh", "--cfg", args.Cfg, "--orderer-address", args.OrdererAddress, "--msp-id", args.MspID, "--msp-config", args.MspConfig, "--orderer-certificate", "ocert.pem", "--channel", id, "--filename", filename, "--docker", str)
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
		os.Remove("./ocert.pem")
		os.Remove("./conf.pb")
		return
	}
	var result map[string]interface{}
	s := fmt.Sprintf("%s", out.String())
	s = removeCerts(s)
	json.Unmarshal([]byte(s), &result)
	jsP, _ := json.Marshal(result["data"].(map[string]interface{})["data"].([]interface{})[0].(map[string]interface{})["payload"].(map[string]interface{})["data"].(map[string]interface{})["config"].(map[string]interface{}))
	os.Remove("./ocert.pem")
	os.Remove("./conf.pb")
	fmt.Fprintf(w, string(jsP))

}
