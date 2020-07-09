package main

import (
	"net/http"
	"regexp"

	"github.com/gorilla/mux"
)

func removeCerts(body string) string {
	re := regexp.MustCompile(`"certificate":\s"(.*",)|"tls_root_certs":\s*\[\s*"(.*"\s*\],)|"root_certs":\s*\[\s*"(.*"\s*\],)|"tls_intermediate_certs":\s*\[\s*"(.*"\s*\],)|"admins":\s*\[\s*"(.*"\s*\],)|"client_tls_cert":\s*\s*"(.*"\s*,)|"server_tls_cert":\s*\s*"(.*"\s*,)`)
	re2 := regexp.MustCompile(`,\s*"certificate":\s"(.*")|,\s*"tls_root_certs":\s*\[\s*"(.*"\s*\])|,\s*"root_certs":\s*\[\s*"(.*"\s*\])|,\s*"tls_intermediate_certs":\s*\[\s*"(.*"\s*\])|,\s*"admins":\s*\[\s*"(.*"\s*\])|,\s*"client_tls_cert":\s*\s*"(.*"\s*)|,\s*"server_tls_cert":\s*\s*"(.*"\s*)`)

	s := re.ReplaceAllString(body, "")
	s = re2.ReplaceAllString(s, "")

	return s
}
func getIdFromRequest(r *http.Request) [6]string {
	id := mux.Vars(r)["id"]
	cfg := r.FormValue("cfg")
	address := r.FormValue("orderer-address")
	mspId := r.FormValue("msp-id")
	mspConfig := r.FormValue("msp-config")
	oca := r.FormValue("orderer-certificate")
	theArray := [6]string{cfg, address, mspId, mspConfig, oca, id}
	return theArray
}
func getArgsForChannelList(r *http.Request) [5]string {
	cfg := r.FormValue("cfg")
	address := r.FormValue("peer-address")
	mspId := r.FormValue("msp-id")
	mspConfig := r.FormValue("msp-config")
	tls := r.FormValue("tls-cert")
	theArray := [5]string{cfg, address, mspId, mspConfig, tls}
	return theArray
}
func getArgsForCCList(r *http.Request) [6]string {
	cfg := r.FormValue("cfg")
	address := r.FormValue("peer-address")
	mspId := r.FormValue("msp-id")
	mspConfig := r.FormValue("msp-config")
	tls := r.FormValue("tls-cert")
	channel := r.FormValue("channel")
	theArray := [6]string{cfg, address, mspId, mspConfig, tls, channel}
	return theArray
}

//http://localhost:8080/channel_info/mychannel?cfg=%22/mnt/265C6B275C6AF14B/fabric/config%22&orderer-address=%22localhost:7050%22&msp-id=%22Org1MSP%22&msp-config=%22/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp%22&orderer-certificate=%22/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem%22
// http://localhost:8080/channel_list?cfg=%22/mnt/265C6B275C6AF14B/fabric/config%22&peer-address=%22localhost:7051%22&msp-id=%22Org1MSP%22&msp-config=%22/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp%22&tls-cert=%22/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt%22
//http://localhost:8080/cc_list?cfg=/mnt/265C6B275C6AF14B/fabric/config&peer-address=localhost:7051&msp-id=Org1MSP&msp-config=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp&tls-cert=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt&channel=mychannel
