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

func GetChannelList(w http.ResponseWriter, r *http.Request) {
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
	cmd := exec.Command("bash", "./bash/peer_channel_list.sh", "--cfg", args.Cfg, "--peer-address", args.PeerAddress, "--msp-id", args.MspID, "--msp-config", args.MspConfig, "--tls-cert", "tls.crt")
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err = cmd.Run()
	if err != nil {
		error := strings.Split(strings.Trim(stderr.String(), "\n"), "->")
		split := strings.Split(error[1], ":")
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
		fmt.Fprintf(w, "{\"error\":\""+split[1]+"\"\n}")
		return
	}
	s := fmt.Sprintf("%s", out.String())
	fmt.Printf(s)
	fmt.Printf("%s", s)
	split := strings.Split(s, "joined:")
	fmt.Printf("%s", split[1])
	temp := strings.Split(split[1], "\n")
	js, er := json.Marshal(temp[1 : len(temp)-1])
	if err != nil {
		fmt.Printf("%s", er)
	}
	os.Remove("./tls.crt")
	fmt.Fprintf(w, string(js))

}
