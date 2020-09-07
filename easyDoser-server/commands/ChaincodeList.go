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

func GetChaincodeList(w http.ResponseWriter, r *http.Request) {
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
	cmd := exec.Command("bash", "./bash/peer_cc_name.sh", "--cfg", args.Cfg, "--peer-address", args.PeerAddress, "--msp-id", args.MspID, "--msp-config", args.MspConfig, "--tls-cert", "./tls.crt", "--channel", args.Channel)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err = cmd.Run()
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
	os.Remove("./tls.crt")
	fmt.Fprintf(w, string(js))

}
