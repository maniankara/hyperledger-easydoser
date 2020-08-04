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

import "./config.css"
export default function CC_config (props) {
    const[status, setStatus] = useState({})
    const[resp , setResp] = useState({})
    const[apolicy, setApolicy] = useState("")
    const[policy, setpolicy] = useState("")    
    const[version, setVersion] = useState("")
    const[finalStatus, setfinalStatus] = useState({})
    const[ready, setReady] = useState(false);
    var peers = {}
    var certs = {}
    const check = async ()=>{
        var validJSON =false;
        try { JSON.parse(policy); validJSON = true } catch (e) { validJSON= false}
        if(validJSON){
           var escaped = escapeJSON(policy)
            console.log(escaped)
            const resp = await checkCommit(escaped, apolicy, version, props.channel, props.chaincode)
            console.log(resp)
            setStatus(true);
            setResp(resp)
            checkReadiness(resp)
            console.log(resp)
                    
        }

    }
    const checkReadiness = (resp) => {
      var flag = true;
      for(var i =0; i<resp.orgs.length; i++){
        
        if(resp.orgs[i].status=="false"){
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
      if(validJSON){
        var escaped = escapeJSON(policy)
        const resp = await commitCC(escaped, apolicy, version, props.channel, props.chaincode, peerlist, certList)
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
                        Approval Policy
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Approval Policy"
                        onChange={(e) => {
                          setApolicy(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        Updated Collection Policy JSON
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Collection Policy"
                        onChange={(e) => {
                          setpolicy(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        Version
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Version"
                        onChange={(e) => {
                          setVersion(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
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
                  <text>{item.name} = {item.status=="true"?"Approved":"Not Approved"}</text>
                </div>):<div></div>
              }
              {
                ready?(resp.orgs.map((item,index)=><div>
                  <h3>{item.name}</h3>
                   <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        Peer Address
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Address"
                        onChange={(e) => {
                          peers[index.toString()]=e.target.value
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        TLS CA CERTIFICATE
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="TLS Cert"
                        onChange={(e) => {
                          certs[index.toString()]=e.target.value
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
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
                  {finalStatus.status!=undefined?(<text><br/><br/>{finalStatus.status}</text>):<div></div>}
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
CC_config.ChannelWidget = {
    config: PropTypes.object,
    channel: PropTypes.string,
    chaincode: PropTypes.string
  };