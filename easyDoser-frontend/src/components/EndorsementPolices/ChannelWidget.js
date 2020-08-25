import React, { useState } from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import ChaincodeList from "components/EndorsementPolices/ChaincodeList.js";
import { Row } from "reactstrap";
import { cookie, keystore, certs } from "constants.js";
import {  FormTextarea } from "shards-react";
import { chaincode_list } from "../../api/api.js";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.js";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import IconButton from "@material-ui/core/IconButton";
import Cookies from "universal-cookie";
import CardFooter from "components/Card/CardFooter.js";

export default function ChannelWidget(props) {
  const [info, setInfo] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cookies = new Cookies();
  const [items, setChannels] = useState([]);
  const [fetch, setFetch] = useState(false);
  const  status = cookies.get(cookie)===undefined?false:true
  const [_certs, setCerts] = useState(cookies.get(certs));
  const [_keystore, setkeystore] = useState(cookies.get(keystore));
  var userCerts="";
  var keystoreFile="";
  const setPaths = ()=>{
    var yolo
    var empty;
    userCerts===""?cookies.get(certs)===undefined?empty=true:yolo=1:cookies.set(certs, userCerts, { path: "/" });
    keystoreFile===""?cookies.get(keystore)===undefined?empty=true:yolo=1:cookies.set(keystore, keystoreFile, { path: "/" });
    keystoreFile===""?cookies.get(keystore)===undefined?empty=true:setkeystore(cookies.get(keystore)):setkeystore(keystoreFile);
    userCerts===""?cookies.get(certs)===undefined?empty=true:setCerts(cookies.get(certs)):setCerts(userCerts);
    console.log(yolo);
    console.log(empty)
  }
  const hStyle = { color: "black" };
  if (!fetch && (status)) {
    chaincode_list(props.item).then((arr) => {
      console.log(arr);
      setChannels(arr);
      setFetch(true);
    });
  }
  const disable = () => {
    setCerts(undefined);
    setkeystore(undefined)
  }
  return (_certs===undefined||_keystore===undefined)?(<div>
    <Card>
      <CardHeader>
        <h3>Some more Paths</h3>
      </CardHeader>
      <CardBody>
      <label className="Lable" htmlFor="#parametername">
         <text style={{fontWeight:'bold'}}>
            User TLS Certificate
          </text>
      </label>
      <FormTextarea
          className="address"
          id="#description"
          style={{height: '40px', width:"500px"}}
          placeholder={cookies.get(certs)===undefined?"User TLS Certificates":cookies.get(certs)}
          onChange={(e) => {
            userCerts=e.target.value
      }}
        >
         
        </FormTextarea>
        <br/>
        <text style={{fontWeight:'450'}}>
          Example
        </text>
          <br/>
        <text>
          /media/user1/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
        </text>
        <br/>
        <br/>
        <label className="Lable" htmlFor="#parametername">
         <text style={{fontWeight:'bold'}}>
            User Keystore file
          </text>
      </label>
        <FormTextarea
          className="address"
          id="#description"
          style={{height: '40px', width:"500px"}}
          placeholder={cookies.get(keystore)===undefined?"User Keystore file":cookies.get(keystore)}
          onChange={(e) => {
            keystoreFile= e.target.value;
      }}
        >
          
        </FormTextarea>
        <br/>
        <text style={{fontWeight:'450'}}>
          Example
        </text>
          <br/>
        <text>
          /media/User1/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/priv_sk
        </text>
      </CardBody>
      <CardFooter>
      <Button
                color="primary"
                onClick={() => {
                  setPaths();
                }}
              >
                Update Varaiables
              </Button>
      </CardFooter>
    </Card>
    </div>):(
    <div >
        <Button onClick={()=>{
          disable();
        }}>
        Edit User certificates
        </Button>
      <Card style={{ background: expanded ? "#f1efd4" : "#ffffff" }}>
        <CardHeader color="warning" stats icon>
          <CardIcon color="warning">
            <p>
              {props.item.toString().substring(0, 1).toUpperCase() +
                props.item
                  .toString()
                  .substring(props.item.length - 1, props.item.length)
                  .toUpperCase()}
            </p>
          </CardIcon>
          <br />
        </CardHeader>
        <CardBody>
          <h3 style={hStyle}>{props.item.toUpperCase()}</h3>
          <h3>{"".toUpperCase()}</h3>
          <IconButton
            background="primary"
            onClick={() => {
              if (!expanded) {
                console.log("here");
                setInfo(true);
                setFetch(false)
                setExpanded(true);
              } else {
                setExpanded(false);
                setInfo(false);
              }
            }}
          >
            {!expanded ? (
              <ExpandMoreIcon fontSize="large" />
            ) : (
              <ExpandLessIcon fontSize="large" />
            )}
          </IconButton>
              {info?(<h3>Chaincodes: </h3>):(<text></text>)}
          {info ? (
             <Row>
             {items.length !== 0 ? (
               items.map((item) => <ChaincodeList keystore = {keystoreFile} certs= {userCerts} channel={props.item} item = {item}></ChaincodeList>)
             ) : (
               <h3>No Channels</h3>
             )}
           </Row>
          ) : expanded ? (
            <text></text>
          ) : (
            <p></p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
ChannelWidget.ChannelWidget = {
  data: PropTypes.object,
  item: PropTypes.string,
  className: PropTypes.object,
};