package commands

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

type CommitCheck struct {
	Orgs []Org `json:"orgs"`
}
type Org struct {
	Name   string `json:"name"`
	Status string `json:"status"`
}
type CommitData struct {
	Policy    string   `json:"policy"`
	APolicy   string   `json:"aPolicy"`
	Version   string   `json:"version"`
	Cfg       string   `json:"cfg"`
	Pa        string   `json:"pa"`
	Mspconf   string   `json:"mspconf"`
	TLS       string   `json:"tls"`
	Oa        string   `json:"oa"`
	Oc        string   `json:"oc"`
	Mspid     string   `json:"mspid"`
	Channel   string   `json:"channel"`
	Chaincode string   `json:"chaincode"`
	Orgs      OrgCerts `json:"orgs"`
}
type OrgCerts struct {
	Address []string `json:"address"`
	Cert    []string `json:"cert"`
}

type ChannelListStruct struct {
	Cfg            string `json:"cfg"`
	PeerAddress    string `json:"peer_address"`
	MspID          string `json:"msp_id"`
	MspConfig      string `json:"msp_config"`
	TLSCert        string `json:"tls_cert"`
	OCerts         string `json:"o_cert"`
	OrdererAddress string `json:"orderer_Address"`
	Channel        string `json:"channel"`
	Chaincode      string `json:"Chaincode"`
	Keypath        string `json:"keypath"`
	Usercert       string `json:"usercert"`
}
