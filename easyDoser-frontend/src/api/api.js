import Cookies from "universal-cookie";
import { cfg, mspid, mspconf, oa, pa, tls, oc, server, keystore, certs} from "constants.js";
export const channel_list = async () => {
  const cookies = new Cookies();

  const tcfg = cookies.get(cfg)
  const tmspid = cookies.get(mspid)
  const tpa = cookies.get(pa)
  const tmspconf = cookies.get(mspconf)
  const ttls = cookies.get(tls)
  const tserver = cookies.get(server)
  console.log(ttls)
  var opts = {
    cfg : tcfg,
    msp_id : tmspid,
    peer_address : tpa,
    msp_config : tmspconf,
    tls_cert : ttls
  }
  console.log(JSON.stringify(opts))
  var resp = await fetch ("http://"+tserver+"/channel_list",{
    method: 'POST',
    body: JSON.stringify(opts)
  });
  return await resp.json()
};
export const channel_info = async (name) => {
  const cookies = new Cookies();

  const tcfg = cookies.get(cfg)
  const tmspid = cookies.get(mspid)
  const toa = cookies.get(oa)
  const tmspconf = cookies.get(mspconf)
  const toc = cookies.get(oc)
  const tserver = cookies.get(server)
  var opts = {
    cfg : tcfg,
    msp_id : tmspid,
    orderer_Address : toa,
    msp_config : tmspconf,
    o_cert : toc
  }
  console.log(JSON.stringify(opts))
  var resp = await fetch ("http://"+tserver+"/channel_info/"+name,{
    method: 'POST',
    body: JSON.stringify(opts)
  });
  return await resp.json()
};
export const chaincode_list = async (channel) => {
  const cookies = new Cookies();

  const tcfg = cookies.get(cfg)
  const tmspid = cookies.get(mspid)
  const tpa = cookies.get(pa)
  const tmspconf = cookies.get(mspconf)
  const ttls = cookies.get(tls)
  const tserver = cookies.get(server)
  var opts = {
    cfg : tcfg,
    msp_id : tmspid,
    peer_address : tpa,
    msp_config : tmspconf,
    tls_cert : ttls,
    channel : channel
  }
  console.log(JSON.stringify(opts))
  var resp = await fetch ("http://"+tserver+"/cc_list",{
    method: 'POST',
    body: JSON.stringify(opts)
  });
  return await resp.json()
  
};
export const chaincode_config = async (channel, cc) => {
  const cookies = new Cookies();

  const tcfg = cookies.get(cfg)
  const tmspid = cookies.get(mspid)
  const tpa = cookies.get(pa)
  const tmspconf = cookies.get(mspconf)
  const ttls = cookies.get(tls)
  const tserver = cookies.get(server)
  var opts = {
    cfg : tcfg,
    msp_id : tmspid,
    peer_address : tpa,
    msp_config : tmspconf,
    tls_cert : ttls,
    channel : channel,
    chaincode: cc
  }
  console.log(JSON.stringify(opts))
  var resp = await fetch ("http://"+tserver+"/cc_config",{
    method: 'POST',
    body: JSON.stringify(opts)
  });
  return await resp.json()
};
export const approveConfig = async (policy, aPolicy, version, channel, chaincode) => {
  const cookies = new Cookies();
  const tcfg = cookies.get(cfg)
  const tmspid = cookies.get(mspid)
  const tpa = cookies.get(pa)
  const tmspconf = cookies.get(mspconf)
  const ttls = cookies.get(tls)
  const toc = cookies.get(oc)
  const toa = cookies.get(oa)

  var opts = {
    policy : policy, 
    aPolicy : aPolicy,
    version : version,
    cfg : tcfg,
    mspid : tmspid,
    pa : tpa,
    mspconf : tmspconf,
    tls : ttls,
    oa : toa,
    oc : toc,
    channel: channel,
    chaincode : chaincode

  }
  const tserver = cookies.get(server)
  var resp = await fetch ("http://"+tserver+"/approve",{
    method: 'post',
    body: JSON.stringify(opts)
  });
  return await resp.json()

}
export const checkCommit = async (policy, aPolicy, version, channel, chaincode) => {
  const cookies = new Cookies();
  const tcfg = cookies.get(cfg)
  const tmspid = cookies.get(mspid)
  const tpa = cookies.get(pa)
  const tmspconf = cookies.get(mspconf)
  const ttls = cookies.get(tls)
  const toc = cookies.get(oc)
  const toa = cookies.get(oa)

  var opts = {
    policy : policy, 
    aPolicy : aPolicy,
    version : version,
    cfg : tcfg,
    mspid : tmspid,
    pa : tpa,
    mspconf : tmspconf,
    tls : ttls,
    oa : toa,
    oc : toc,
    channel: channel,
    chaincode : chaincode

  }
  const tserver = cookies.get(server)
  var resp = await fetch ("http://"+tserver+"/check",{
    method: 'post',
    body: JSON.stringify(opts)
  });
  return await resp.json()

}
export const commitCC = async (policy, aPolicy, version, channel, chaincode, address, certs) => {
  const cookies = new Cookies();
  const tcfg = cookies.get(cfg)
  const tmspid = cookies.get(mspid)
  const tpa = cookies.get(pa)
  const tmspconf = cookies.get(mspconf)
  const ttls = cookies.get(tls)
  const toc = cookies.get(oc)
  const toa = cookies.get(oa)

  var opts = {
    policy : policy, 
    aPolicy : aPolicy,
    version : version,
    cfg : tcfg,
    mspid : tmspid,
    pa : tpa,
    mspconf : tmspconf,
    tls : ttls,
    oa : toa,
    oc : toc,
    channel: channel,
    chaincode : chaincode,
    orgs:{
      address : address,
      cert : certs,
    }

  }
  console.log(JSON.stringify(opts))
  const tserver = cookies.get(server)
  var resp = await fetch ("http://"+tserver+"/commit",{
    method: 'post',
    body: JSON.stringify(opts)
  });
  return await resp.json()

}
export const endorsementPolicy = async (channel, cc) => {
  const cookies = new Cookies();

  const tmspid = cookies.get(mspid)
  const tpa = cookies.get(pa)
  const ttls = cookies.get(tls)
  const tserver = cookies.get(server)
  const tcerts = cookies.get(certs)
  const tkeystore = cookies.get(keystore)
  var opts = {
    msp_id : tmspid,
    peer_address : tpa,
    tls_cert : ttls,
    channel: channel,
    chaincode : cc,
    usercert: tcerts,
    keypath : tkeystore

  }
  console.log(opts)
  var resp = await fetch ("http://"+tserver+"/endorsement_policy",{
    method: 'POST',
    body: JSON.stringify(opts)
  });
  return await resp.json()
};

//      "?cfg=/mnt/265C6B275C6AF14B/fabric/config&orderer-address=localhost:7050&msp-id=Org1MSP&msp-config=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp&orderer-certificate=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"
//    "http://localhost:8080/channel_list?cfg=/mnt/265C6B275C6AF14B/fabric/config&peer-address=localhost:7051&msp-id=Org1MSP&msp-config=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp&tls-cert=/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"
