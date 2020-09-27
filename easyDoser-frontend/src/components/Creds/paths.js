
import React, { useState } from "react";
import { server, mspid, oa, pa, tls, oc, cookie,cfg,mspconf,docker} from "constants.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {  FormTextarea , FormInput} from "shards-react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import Checkbox from '@material-ui/core/Checkbox';


import './Path.css';
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function Paths(props) {
  const [tpa, setPA] = useState("");
  const [tmspID, setMI] = useState("");
  const [ttls, setTLS] = useState("");
  const [toa, setOA] = useState("");
  const [toc, setOC] = useState("");
  const [tserver, setServer] = useState("");
  const [tcfg, setCfg] = useState("");
  const [tmspconf, setMspconf] = useState("");
  const[showAlert, setAlert]= useState(false)
  const[tdocker, setDocker] = useState(true);
  const handleCheck = (event) => {
    setDocker(event.target.checked);
  }
  var empty= false
  console.log(showAlert)
  const cookies = new Cookies();
  const setCookies = () => {
    var yolo
    tpa===""?cookies.get(pa)===undefined?empty=true:yolo=1:cookies.set(pa, tpa, { path: "/" });
    tmspID===""?cookies.get(mspid)===undefined?empty=true:yolo=1:cookies.set(mspid, tmspID, { path: "/" });
    toa===""?cookies.get(oa)===undefined?empty=true:yolo=1:cookies.set(oa, toa, { path: "/" });
    toc===""?cookies.get(oc)===undefined?empty=true:yolo=1:cookies.set(oc, toc, { path: "/" });
    ttls===""?cookies.get(tls)===undefined?empty=true:yolo=1:cookies.set(tls, ttls, { path: "/" });
    tcfg===""?cookies.get(cfg)===undefined?empty=true:yolo=1:cookies.set(cfg, tcfg, { path: "/" });
    tmspconf===""?cookies.get(mspconf)===undefined?empty=true:yolo=1:cookies.set(mspconf, tmspconf, { path: "/" });
    cookies.set(docker, tdocker, { path: "/" })
    tserver===""?cookies.get(server)===undefined?cookies.set(server, "localhost:8080", { path: "/" } ):yolo=1:cookies.set(server, tserver, { path: "/" });
    console.log(yolo)
    if(empty){
      setAlert(true)
    }else{
      cookies.set(cookie, true, { path: "/" })
      props.callback()
    }

  };
  const classes = useStyles();
  const handleFileRead = (contractFile, func) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsText(contractFile);
      fileReader.onloadend = (e) => {
        const content = fileReader.result;
        console.log(content)
        func(content);
      };
    });
  };

  const handleFileChosen = async (e, func) => {
    console.log("file", e.target.files[0]);
    const file = e.target.files[0];

    const isCorrect = await handleFileRead(file,func);
    if (!isCorrect) {
      return;
    }

  };

  return (
    <div>
     {empty?(<text color="black">Please enter all the values</text>):""}
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
        
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Environment Variables</h4>
              <p className={classes.cardCategoryWhite}>
                Add Absolute paths and correct Addresses
              </p>
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                        EasyDoser Server URL
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        style={{height: '40px', width:"500px"}}
                        placeholder={cookies.get(server)===undefined?"default: localhost:8080":cookies.get(server)}
                        onChange={(e) => {
                          setServer(e.target.value)
                    }}
                  />
                      
                </GridItem>
                <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                    localhost:8080
                  </text>
                  <br/>
                </GridItem>
              </GridContainer>
              <br/>
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
                        style={{height: '40px', width:"500px"}}
                        placeholder={cookies.get(pa)===undefined?"Peer Address":cookies.get(pa)}
                        onChange={(e) => {
                          setPA(e.target.value)
                    }}
                  />
                      
                </GridItem>
                <GridItem>
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
                        Orderer Address
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        style={{height: '40px', width:"500px"}}
                        placeholder={cookies.get(oa)===undefined?"Orderer Address":cookies.get(oa)}
                        onChange={(e) => {
                          setOA(e.target.value)
                    }}
                  />
                      
                </GridItem>
                <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                    localhost:7050
                  </text>
                </GridItem>
              </GridContainer>
              <br/>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                        MSP ID
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        style={{height: '40px', width:"500px"}}
                        placeholder={cookies.get(mspid)===undefined?"MSP ID":cookies.get(mspid)}
                        onChange={(e) => {
                          setMI(e.target.value)
                    }}
                  />
                      
                </GridItem>
                <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                    Org1MSP
                  </text>
                </GridItem>
              </GridContainer>
              <br/>
             
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                        TLS Certificate
                      </text>
                      </label>
                      <br/>
                      <FormInput
                        type="file"
                        id="file"
                        className="input-file"
                        accept=".crt"
                        onChange={obj => {
                          handleFileChosen(obj,setTLS)
                        }}
                      />

                </GridItem>
                <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                  /media/user1/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt                  </text>
                </GridItem>
              </GridContainer>
              <br/>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                        Orderer Certificate
                      </text>
                      </label>
                      <br/>
                      <FormInput
                        type="file"
                        id="file"
                        className="input-file"
                        accept=".pem"
                        onChange={obj => {
                          handleFileChosen(obj,setOC)
                        }}
                      />
                      
                </GridItem>
                <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                  /media/user1/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
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
              <text>Running on Docker</text>
              {!tdocker?(<div>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                        Core Config Path
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Collection Policy"
                        style={{height: '40px', width:"500px"}}
                        onChange={(e) => {
                          setCfg(e.target.value)
                    }}
                  />
                      
                </GridItem>
                <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                  /mnt/265C6B275C6AF14B/fabric/config
                  </text>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                <label className="Lable" htmlFor="#parametername">
                      <text style={{fontWeight:'bold'}}>
                        MSP Config
                      </text>
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder="Collection Policy"
                        style={{height: '40px', width:"500px"}}
                        onChange={(e) => {
                          setMspconf(e.target.value)
                    }}
                  />
                      
                </GridItem>
                <GridItem>
                  <text style={{fontWeight:'450'}}>
                    Example
                  </text>
                  <br/>
                  <text>
                  /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp                  </text>
                </GridItem>
              </GridContainer>
              </div>):<div></div>}
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                onClick={() => {
                  setCookies();
                }}
              >
                Update Varaiables
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
Paths.ChannelWidget = {
  callback: PropTypes.func,
};
