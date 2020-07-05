import Cookies from "universal-cookie";
import { cfg, mspid, mspconf, oa, pa, tls, oc, cookie} from "constants.js";
export const channel_list = async () => {
  const cookies = new Cookies();

  const tcfg = cookies.get(cfg)
  const tmspid = cookies.get(mspid)
  const tpa = cookies.get(pa)
  const tmspconf = cookies.get(mspconf)
  const ttls = cookies.get(tls)
  console.log(ttls)
  var res = await fetch(
    "http://localhost:8080/channel_list?cfg="+tcfg+"&peer-address="+tpa+"&msp-id="+tmspid+"&msp-config="+tmspconf+"&tls-cert="+ttls

  );
  console.log(res);
  return res.json();
};
export const channel_info = async (name) => {
  const cookies = new Cookies();

  const tcfg = cookies.get(cfg)
  const tmspid = cookies.get(mspid)
  const toa = cookies.get(oa)
  const tmspconf = cookies.get(mspconf)
  const toc = cookies.get(oc)
  var res = await fetch(
    "http://localhost:8080/channel_info/" +
      name +
      "?cfg="+tcfg+"&orderer-address="+toa+"&msp-id="+tmspid+"&msp-config="+tmspconf+"&orderer-certificate="+toc
  );
  console.log(res);
  return res.json();
};
//      "?cfg=/mnt/265C6B275C6AF14B/fabric/config&orderer-address=localhost:7050&msp-id=Org1MSP&msp-config=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp&orderer-certificate=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"
//    "http://localhost:8080/channel_list?cfg=/mnt/265C6B275C6AF14B/fabric/config&peer-address=localhost:7051&msp-id=Org1MSP&msp-config=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp&tls-cert=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"
