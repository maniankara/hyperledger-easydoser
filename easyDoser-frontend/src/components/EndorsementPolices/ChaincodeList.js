import React, { useState } from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import { Spinner } from "reactstrap";
import { endorsementPolicy } from "../../api/api.js";
import PropTypes from "prop-types";
import Policy from "components/EndorsementPolices/policy.js"
import materialColor from "utils/ColorRandominator.js";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import IconButton from "@material-ui/core/IconButton";

export default function ChaincodeList(props) {
  const [info, setInfo] = useState(false);
  const [data, setData] = useState({});
  const [expanded, setExpanded] = useState(false);
  const hStyle = { color: "black" };
  const fetch = async () => {
    setInfo(true)
    var data = await endorsementPolicy(props.channel, props.item);
    setData(data);
    setInfo(false)
    
    console.log(data)
  };
  return (
    <div >
     
      <Card style={{ background: materialColor() }}>
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
                fetch();
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

          {info ? (
            <div style={{ justifyContent: "center", alignContent: "center" }}>
              <Spinner animation="grow" variant="dark" size="sm" />
              <h3>Loading..</h3>
            </div>
          ) :expanded?(
            <Policy policy ={data} ></Policy>
          ): (
            <p></p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
ChaincodeList.ChannelWidget = {
  channel: PropTypes.channel,
  item: PropTypes.string,
  className: PropTypes.object,
  keysote : PropTypes.string,
  certs: PropTypes.string
  
};