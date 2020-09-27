import React, { useState } from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import ChaincodeList from "components/EditCollection/ChaincodeList.js";
import { Row } from "reactstrap";
import { cookie } from "constants.js";

import { chaincode_list } from "../../api/api.js";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import IconButton from "@material-ui/core/IconButton";
import Cookies from "universal-cookie";

export default function ChannelWidget(props) {
  const [info, setInfo] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cookies = new Cookies();
  const [items, setChannels] = useState([]);
  const [fetch, setFetch] = useState(false);
  const status = cookies.get(cookie)===undefined?false:true

  const hStyle = { color: "black" };
  if (!fetch && (status)) {
    chaincode_list(props.item).then((arr) => {
      console.log(arr);
      setChannels(arr);
      setFetch(true);
    });
  }
  return (
    <div onClick={() => {}}>
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
          {items.error === undefined? info ? (
             <Row>
             {items.length !== 0 ? (
               items.map((item) => <ChaincodeList channel={props.item} item = {item}></ChaincodeList>)
             ) : (
               <h3>No Channels</h3>
             )}
           </Row>
          ) : expanded ? (
            <text></text>
          ) : (
            <p></p>
          ):(
            <div>
               {expanded? <text>
                {items.error}
              </text>:<p></p>}
            </div>
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