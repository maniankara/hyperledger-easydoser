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
import Checkbox from '@material-ui/core/Checkbox';

import "./config.css"
export default function CC_config (props) {
    const[status, setStatus] = useState(false)
    const[resp , setResp] = useState({})
    const[apolicy, setApolicy] = useState("")
    const[policy, setpolicy] = useState("")    
    const[version, setVersion] = useState("")
    const[enableCollection, setEnableCollection] = useState(true);
    const handleCheck = (event) => {
      setEnableCollection(event.target.checked);
    }
    const approve = async ()=>{
        var validJSON =false;
        try { JSON.parse(policy); validJSON = true } catch (e) { validJSON= false}
        if(validJSON||!enableCollection){
           var escaped = escapeJSON(policy)
            console.log(escaped)
            const resp = await approveConfig(enableCollection?escaped:"null", apolicy, version, props.channel, props.chaincode)
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
                      <text style={{fontWeight:'bold'}}>
                        Endorsement Policy
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Approval Policy"
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
                        Updated Private Collection JSON
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
              <br/>
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
                      
                </GridItem>
                <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                    1.2
                  </text>
                </GridItem>
              </GridContainer>
              <Button
                color="primary"
                onClick={() => {
                  approve()
                }}
              >
                Approve
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