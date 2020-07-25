package main

type updateConfig struct {
	Policy    string `json:"policy"`
	APolicy   string `json:"aPolicy"`
	Version   string `json:"version"`
	Cfg       string `json:"cfg"`
	Pa        string `json:"pa"`
	Mspconf   string `json:"mspconf"`
	TLS       string `json:"tls"`
	Oa        string `json:"oa"`
	Oc        string `json:"oc"`
	Mspid     string `json:"mspid"`
	Channel   string `json:"channel"`
	Chaincode string `json:"chaincode"`
}
