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
func getIdFromRequest(r *http.Request) string {
	id := mux.Vars(r)["id"]
	return id
}
