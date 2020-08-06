package commands

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"
	"strings"
)

func GetChaincodeList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	arr := getArgsForCCList(r)
	cmd := exec.Command("bash", "./bash/peer_cc_name.sh", "--cfg", arr[0], "--peer-address", arr[1], "--msp-id", arr[2], "--msp-config", arr[3], "--tls-cert", arr[4], "--channel", arr[5])
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
	fmt.Fprintf(w, string(js))

}
