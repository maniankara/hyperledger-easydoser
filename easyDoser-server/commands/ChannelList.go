package commands

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"
	"strings"
)

func GetChannelList(w http.ResponseWriter, r *http.Request) {
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
