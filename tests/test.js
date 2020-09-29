
const { expect, assert, use  } = require('chai')

var chai = require('chai')
  , chaiHttp = require('chai-http');
 
chai.use(chaiHttp);
var glob = require("glob")


const app = 'localhost:8080'
var path = require('path')
var fs = require('fs')
var oCertPath = path.join('/home/runner/work/hyperledger-easydoser/hyperledger-easydoser/fabric-samples/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem')
oca = ""
tls = ""
usercert=""
ks=""
fs.readFile(oCertPath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        oca = data
    } else {
        console.log(err);
    }
});
var tlsCertPath = path.join('/home/runner/work/hyperledger-easydoser/hyperledger-easydoser/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt')
fs.readFile(tlsCertPath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        tls = data
    } else {
        console.log(err);
    }
});
var userCert = path.join('/home/runner/work/hyperledger-easydoser/hyperledger-easydoser/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/cert.pem')
fs.readFile(userCert, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        usercert = data
    } else {
        console.log(err);
    }
});

glob("/home/runner/work/hyperledger-easydoser/hyperledger-easydoser/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/*", function (er, files) {
    
    var keystorePath = path.join(files[0])
    fs.readFile(keystorePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            ks = data
        } else {
            console.log(err);
        }
    });

  })
var cfg = "/home/runner/work/hyperledger-easydoser/hyperledger-easydoser/fabric-samples/config"
var mspid = "Org1MSP"
var peerAddress = "localhost:7051"
var ordererAddress = "localhost:7050"
var mspConfig = "/home/runner/work/hyperledger-easydoser/hyperledger-easydoser/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
var ordererCert = oca
var tlsCert = tls
var channel = "mychannel"
var docker = "false"
var chaincode =""
var policy ="OR('Org1MSP.member','Org2MSP.member')"
var collection = `[
    {
      "name": "collectionMarbles",
      "policy": "OR('Org1MSP.member', 'Org2MSP.member')",
      "requiredPeerCount": 0,
      "maxPeerCount": 3,
      "blockToLive":1000000,
      "memberOnlyRead": true
   },
    {
      "name": "collectionMarblePrivateDetails",
      "policy": "OR('Org1MSP.member')",
      "requiredPeerCount": 0,
      "maxPeerCount": 3,
      "blockToLive":3,
      "memberOnlyRead": true
    }
   ]`
var version = "3.4"
//----------------------------org2--------------------//

var mspid2 = "Org2MSP"
var peerAddress2 = "localhost:9051"
var mspConfig2 = "/home/runner/work/hyperledger-easydoser/hyperledger-easydoser/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp"
var tlsCert2 = ""
var tlsCertPath2 = path.join('/home/runner/work/hyperledger-easydoser/hyperledger-easydoser/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt')
fs.readFile(tlsCertPath2, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        tlsCert2 = data
    } else {
        console.log(err);
    }
});
//---------------------org2-------------------------------//

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}
describe("Welcome message", ()=> {
    it('Returns welcome message',(done)=>{
        chai.request(app).get('/').end((err,res)=>{
            if(err) done (err);
            expect(res).to.have.status(200);

            done()
            
        })
    })
})
describe("Get Channel List", ()=> {
    it('Returns list of channels',(done)=>{
        chai.request(app).post('/channel_list').send({
            cfg : cfg,
            msp_id : mspid,
            peer_address : peerAddress,
            msp_config : mspConfig,
            tls_cert : tls,
            docker :docker
        }).end( (err,res)=>{
            if(err) done (err);
            expect(res).to.have.status(200);
            var obj = JSON.parse(res.text); 
            assert( obj.length === 1, 'No channels fetched')
            channel = obj[0]
            console.log(channel)
            done()
            
        })
    })
})
describe("Get Channel Information", ()=> {
    it('Returns mychannel\'s informations',(done)=>{
        chai.request(app).post('/channel_info/'+channel).send({
            cfg : cfg,
            msp_id : mspid,
            orderer_Address : ordererAddress,
            msp_config : mspConfig,
            o_cert : ordererCert,
            docker :docker
        }).end( (err,res)=>{
            if(err) done (err);
            expect(res).to.have.status(200)
            var obj = JSON.parse(res.text);  
            assert(obj.channel_group!==undefined, "Invalid channel info")          
            done()
            
        })
    })
})
describe("Get Chaincode list", ()=> {
    it('Returns chaincode list',(done)=>{
        chai.request(app).post('/cc_list').send({
            cfg : cfg,
            msp_id : mspid,
            peer_address : peerAddress,
            msp_config : mspConfig,
            tls_cert : tls,
            channel: channel,
            docker :docker
        }).end( (err,res)=>{
            if(err) done (err);
            expect(res).to.have.status(200)
            var obj = JSON.parse(res.text); 
            assert(obj.length===1, "Invalid chaincode list")  
            chaincode = obj[0]        
            done()
            
        })
    })
})
describe("Get chaincode collection", ()=> {
    it('Returns private data collections',(done)=>{
        chai.request(app).post('/cc_config').send({
            cfg : cfg,
            msp_id : mspid,
            peer_address : peerAddress,
            msp_config : mspConfig,
            tls_cert : tls,
            channel: channel,
            chaincode: chaincode,
            docker :docker
        }).end( (err,res)=>{
            if(err) done (err);
            expect(res).to.have.status(200)
            var obj = JSON.parse(res.text); 
            assert(obj.error=== undefined, obj.error) 
            done()
            
        })
    })
})
describe("Get Endorsement Policy of Channel", ()=> {
    it('Returns private data collections',(done)=>{
        chai.request(app).post('/endorsement_policy').send({
            msp_id : mspid,
            peer_address : peerAddress,
            tls_cert : tls,
            channel: channel,
            chaincode: chaincode,
            usercert: usercert,
            keypath : ks,
            docker :docker
        }).end( (err,res)=>{
            if(err) done (err);
            expect(res).to.have.status(200)
            var obj = JSON.parse(res.text); 
            assert(obj.error=== undefined, obj.error) 
            console.log(obj)
            done()
            
        })
    })
})
describe("Approve", ()=> {

    it('Approves new definition',async ()=>{
        var res = await chai.request(app).post('/approve').send({
            cfg : cfg,
            mspid : mspid,
            pa : peerAddress,
            mspconf : mspConfig,
            tls : tls,
            channel: channel,
            chaincode: chaincode,
            docker :docker,
            policy : collection,
            aPolicy: policy,
            version: version,
            oa : ordererAddress,
            oc : oca
        })
        expect(res).to.have.status(200)
        var obj = JSON.parse(res.text); 
        assert(obj.error === undefined, obj.error) 
        
    }).timeout(1000000)
})
describe("Approve org 2", ()=> {
    it('Approves new definition with org2',async ()=>{
         var res = await chai.request(app).post('/approve').send({
            cfg : cfg,
            mspid : mspid2,
            pa : peerAddress2,
            mspconf : mspConfig2,
            tls : tlsCert2,
            channel: channel,
            chaincode: chaincode,
            docker :docker,
            policy : collection,
            aPolicy: policy,
            version: version,
            oa : ordererAddress,
            oc : oca
        })
        expect(res).to.have.status(200)
        var obj = JSON.parse(res.text); 
        assert(obj.error === undefined, obj.error)
    }).timeout(100000)
})
describe("Commit Readiness", ()=> {
    it('Checking Commit Readiness',async ()=>{
        var res = await  chai.request(app).post('/check').send({
            cfg : cfg,
            mspid : mspid2,
            pa : peerAddress2,
            mspconf : mspConfig2,
            tls : tlsCert2,
            channel: channel,
            chaincode: chaincode,
            docker :docker,
            policy : collection,
            aPolicy: policy,
            version: version,
            oa : ordererAddress,
            oc : oca
        })
        expect(res).to.have.status(200)
            var obj = JSON.parse(res.text); 
            assert(obj.error === undefined, obj.error) 
    }).timeout(100000)
})

describe("Commit ", ()=> {
    it('Commit new definition',async ()=>{
        var res = await  chai.request(app).post('/commit').send({
            cfg : cfg,
            mspid : mspid2,
            pa : peerAddress2,
            mspconf : mspConfig2,
            tls : tlsCert2,
            channel: channel,
            chaincode: chaincode,
            docker :docker,
            policy : collection,
            aPolicy: policy,
            version: version,
            oa : ordererAddress,
            oc : oca,
            orgs:{
                address : [peerAddress,peerAddress2],
                cert : [tls, tlsCert2],
              }
        })
        expect(res).to.have.status(200)
        var obj = JSON.parse(res.text); 
        assert(obj.status !== undefined, obj.error) 
    }).timeout(10000)
})