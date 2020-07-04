export const channel_list = async ()=>{
    var res = await fetch("http://localhost:8080/channel_list?cfg=/mnt/265C6B275C6AF14B/fabric/config&peer-address=localhost:7051&msp-id=Org1MSP&msp-config=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp&tls-cert=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt");
    console.log(res)
    return res.json();
}
export const channel_info = async (name)=>{
    var res = await fetch("http://localhost:8080/channel_info/"+name+"?cfg=/mnt/265C6B275C6AF14B/fabric/config&orderer-address=localhost:7050&msp-id=Org1MSP&msp-config=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp&orderer-certificate=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem");
    console.log(res)
    return res.json();
}