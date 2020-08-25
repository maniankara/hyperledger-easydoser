// @material-ui/core
import ChannelWidget from "components/EndorsementPolices/ChannelWidget.js";
import Paths from "components/Creds/paths.js";
import React, { useState } from "react";
import { Row } from "reactstrap";
// Components
import { channel_list } from "../../api/api.js";
import Cookies from "universal-cookie";
import { cookie } from "constants.js";
import Button from "components/CustomButtons/Button.js";

export default function EndorsementPolicies() {
  const cookies = new Cookies();
  const [items, setChannels] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [status, setStatus] = useState(cookies.get(cookie)===undefined?false:true)

  const enable = () => {
    if (cookies.get(cookie) === undefined) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  };

  if (!fetch && (status)) {
    channel_list().then((arr) => {
      console.log(arr);
      setChannels(arr);
      setFetch(true);
    });
  }
  return (
    <div>
      {status? (
        <div>
        <Button color="red" onClick={()=>{
              cookies.set(cookie,undefined, { path: "/" })
              setStatus(false)
            }}>
     
              Edit Paths
   
        </Button>
        <br/>
      
        <Row>
          {items.length !== 0 ? (
            items.map((item) => <ChannelWidget item={item}></ChannelWidget>)
          ) : (
            <h3>No Channels</h3>
          )}
        </Row>
        </div>
      ) : (
        <Paths callback={enable}></Paths>
       
      )
      
      },
    </div>
  );
}
