import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {  FormTextarea } from "shards-react";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import * as escapeJSON from "escape-json-node";
import {commitCC,checkCommit} from "api/api"
import Checkbox from '@material-ui/core/Checkbox';


import "./config.css"
export default function CConfig (props) {
    const[resp , setResp] = useState({})
    const[apolicy, setApolicy] = useState("")
    const[policy, setpolicy] = useState("")    
    const[version, setVersion] = useState("")
    const[finalStatus, setfinalStatus] = useState({})
    const[ready, setReady] = useState(false);
    const[enableCollection, setEnableCollection] = useState(true);
    var peers = {}
    var certs = {}
    const handleCheck = (event) => {
      setEnableCollection(event.target.checked);
    }
   
    const check = async ()=>{
        var validJSON =false;
        try { JSON.parse(policy); validJSON = true } catch (e) { validJSON= false}
        if(validJSON||!enableCollection){
           var escaped = escapeJSON(policy)
            console.log(escaped)
            const resp = await checkCommit(enableCollection?escaped:"null", apolicy, version, props.channel, props.chaincode)
            console.log(resp)
            setResp(resp)
            checkReadiness(resp)
            console.log(resp)
                    
        }

    }
    const checkReadiness = (resp) => {
      var flag = true;
      for(var i =0; i<resp.orgs.length; i++){
        
        if(resp.orgs[i].status==="false"){
          flag = false;
          break
        }
        
      }
      setReady(flag)
    }
    const commit = async() => {
      var validJSON =false;
      try { JSON.parse(policy); validJSON = true } catch (e) { validJSON= false}
      const peerlist = Object.values(peers);
      const certList = Object.values(certs);
      if(validJSON||!enableCollection){
        var escaped = escapeJSON(policy)
        const resp = await commitCC(enableCollection?escaped:"null", apolicy, version, props.channel, props.chaincode, peerlist, certList)
        console.log(resp)
        setfinalStatus(resp)
      }
    }

    return (
    <Card>
        <CardHeader>
            <h3>Update Collection Policy</h3>
        </CardHeader>
        <CardBody>
        <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                        Endorsement Policy
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Endorsement Policy"
                        style={{height: '40px', width:"500px"}}
                        onChange={(e) => {
                          setApolicy(e.target.value)
                    }}
                  />
                      
                </GridItem>
                <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                  OR('Org1MSP.member','Org2MSP.member')
                  </text>
                </GridItem>
              </GridContainer>
              <br/>
              <Checkbox
                defaultChecked
                onChange = {handleCheck}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <text>Private Data Collection</text>
              {enableCollection?(<GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                       Updated Private Collection Definition
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Collection Policy"
                        style={{height: '40px', width:"500px"}}
                        onChange={(e) => {
                          setpolicy(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>):<div></div>}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                        Version
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Version"
                        style={{height: '40px', width:"500px"}}
                        onChange={(e) => {
                          setVersion(e.target.value)
                    }}
                  />
                      
                </GridItem><GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                  1.2
                  </text>
                </GridItem>
              </GridContainer>
              <br/>
              <Button
                color="primary"
                onClick={() => {
                  check()
                }}
              >
                Check Commit Readiness
              </Button>
              {
                resp.orgs!==undefined?resp.orgs.map((item)=><div>
                  <text>{item.name} = {item.status==="true"?"Approved":"Not Approved"}</text>
                </div>):<div></div>
              }
              {
                ready?(resp.orgs.map((item,index)=><div>
                  <h3>{item.name}</h3>
                   <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                     <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                       Peer Address
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Address"
                        style={{height: '40px', width:"500px"}}
                        onChange={(e) => {
                          peers[index.toString()]=e.target.value
                    }}
                  />
                      
                </GridItem> <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                  localhost:7051
                  </text>
                </GridItem>
              </GridContainer>
              <br/>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                        TLS CA Certifiacte
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="TLS Cert"
                        style={{height: '40px', width:"500px"}}
                        onChange={(e) => {
                          certs[index.toString()]=e.target.value
                    }}
                  />
                      
                </GridItem> 
                <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                  /media/User1/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt                  </text>
                </GridItem>
              </GridContainer>
              <br/>
                </div>)):(<div></div>)
               
              }
              { ready?(
                  <div>
                    <Button
                    color="primary"
                    onClick={() => {
                      commit()
                      }}
                    >
                      Commit chaincode Definition
                  </Button>
                  {finalStatus.status!==undefined?(<text><br/><br/>{finalStatus.status}</text>):<div></div>}
                  </div>
                ):(
                  <div></div>
                )}
              <CardFooter>
             
            </CardFooter>

        </CardBody>
    </Card>
    );
}
CConfig.ChannelWidget = {
    config: PropTypes.object,
    channel: PropTypes.string,
    chaincode: PropTypes.string
  };