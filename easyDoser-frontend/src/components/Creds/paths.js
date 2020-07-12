
import React, { useState } from "react";
import { server, cfg, mspid, mspconf, oa, pa, tls, oc, cookie} from "constants.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {

  FormTextarea

} from "shards-react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";


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
  const [tcfg, setCFG] = useState("");
  const [tpa, setPA] = useState("");
  const [tmspID, setMI] = useState("");
  const [tmspConf, setMC] = useState("");
  const [ttls, setTLS] = useState("");
  const [toa, setOA] = useState("");
  const [toc, setOC] = useState("");
  const [tserver, setServer] = useState("");
  const[showAlert, setAlert]= useState(false)
  var empty= false
  
  const cookies = new Cookies();
  const setCookies = () => {
    var yolo
    tcfg==""?cookies.get(cfg)===undefined?empty=true:yolo=1:cookies.set(cfg, tcfg, { path: "/" });
    tpa==""?cookies.get(pa)===undefined?empty=true:yolo=1:cookies.set(pa, tpa, { path: "/" });
    tmspID==""?cookies.get(mspid)===undefined?empty=true:yolo=1:cookies.set(mspid, tmspID, { path: "/" });
    tmspConf==""?cookies.get(mspconf)===undefined?empty=true:yolo=1:cookies.set(mspconf, tmspConf, { path: "/" });
    toa==""?cookies.get(oa)===undefined?empty=true:yolo=1:cookies.set(oa, toa, { path: "/" });
    toc==""?cookies.get(oc)===undefined?empty=true:yolo=1:cookies.set(oc, toc, { path: "/" });
    ttls==""?cookies.get(tls)===undefined?empty=true:yolo=1:cookies.set(tls, ttls, { path: "/" });
    tserver==""?cookies.get(server)===undefined?cookies.set(server, "localhost:8080", { path: "/" } ):yolo=1:cookies.set(server, tserver, { path: "/" });

    if(empty){
      setAlert(true)
    }else{
      cookies.set(cookie, true, { path: "/" })
      props.callback()
    }

  };
  const classes = useStyles();
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
                        EasyDoser Server
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder={cookies.get(server)===undefined?"default: localhost:8080":cookies.get(server)}
                        onChange={(e) => {
                          setServer(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        Core CFG Path
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder={cookies.get(cfg)===undefined?"Core CFG Path":cookies.get(cfg)}
                        onChange={(e) => {
                          setCFG(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        Peer Address
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder={cookies.get(pa)===undefined?"Peer Address":cookies.get(pa)}
                        onChange={(e) => {
                          setPA(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        Orederer Address
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder={cookies.get(oa)===undefined?"Orderer Address":cookies.get(oa)}
                        onChange={(e) => {
                          setOA(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        MSP ID
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder={cookies.get(mspid)===undefined?"MSP ID":cookies.get(mspid)}
                        onChange={(e) => {
                          setMI(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        MSP Config
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder={cookies.get(mspconf)===undefined?"MSP Config":cookies.get(mspconf)}
                        onChange={(e) => {
                          setMC(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        TLS Certificate
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder={cookies.get(tls)===undefined?"TLS certificate":cookies.get(tls)}
                        onChange={(e) => {
                          setTLS(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
              
                      <label className="Lable" htmlFor="#parametername">
                        Orderer Certificate
                      </label>
                      <br/>
                      <FormTextarea
                        className="address"
                        id="#description"
                        placeholder={cookies.get(oc)===undefined?"Orderer Certificate":cookies.get(oc)}
                        onChange={(e) => {
                          setOC(e.target.value)
                    }}
                  />
                      
                </GridItem>
              </GridContainer>
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
