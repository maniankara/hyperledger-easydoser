package main

import (
	"net/http"
	"regexp"
	"strings"

	"github.com/gorilla/mux"
)

func extractValue(body string, key string) string {
	keystr := "\"" + key + "\":[^,;\\]}]*"
	r, _ := regexp.Compile(keystr)
	match := r.FindString(body)
	keyValMatch := strings.Split(match, ":")
	return strings.ReplaceAll(keyValMatch[1], "\"", "")
}
func getIdFromRequest(r *http.Request) string {
	id := mux.Vars(r)["id"]
	return id
}
