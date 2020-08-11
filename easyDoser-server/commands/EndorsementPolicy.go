package commands

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"
)

func GetEndorsementPolicy(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	arr := endorsementArgs(r)
	cmd := exec.Command("bash", "./bash/discover_endorsement_policy.sh", "--peer-address", arr[0], "--msp-id", arr[1], "--tls", arr[2], "--channel", arr[3], "--chaincode", arr[4], "--keypath", arr[5], "--user-cert", arr[6])
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err := cmd.Run()

	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String())
	}
	s := fmt.Sprintf("%s", out.String())
	var result map[string]interface{}
	json.Unmarshal([]byte(s), &result)
	js, _ := json.Marshal(result)

	fmt.Fprintf(w, string(js))

}
