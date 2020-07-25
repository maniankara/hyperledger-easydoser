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
import {approveConfig} from "api/api"

import "./config.css"
export default function CC_config (props) {
    const[status, setStatus] = useState(false)
    const[resp , setResp] = useState({})
    const[apolicy, setApolicy] = useState("")
    const[policy, setpolicy] = useState("")    
    const[version, setVersion] = useState("")

    const approve = async ()=>{
        var validJSON =false;
        try { JSON.parse(policy); validJSON = true } catch (e) { validJSON= false}
        if(true){
           var escaped = escapeJSON(policy)
            console.log(escaped)
            const resp = await approveConfig(escaped, apolicy, version, props.channel, props.chaincode)
            console.log(resp)
            setStatus(true);
            setResp(resp)
            console.log(resp)
                    
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
                  approve()
                }}
              >
                Update Varaiables
              </Button>
              <CardFooter>
              {status?(<text>
                {resp.status}
              </text>):(<text>

              </text>)}
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