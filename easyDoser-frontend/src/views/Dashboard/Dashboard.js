// @material-ui/core
import ChannelWidget from "components/Channel/ChannelWidget.js";
import React, { useState } from "react";
import { Row } from "reactstrap";
// Components
import { channel_list } from "../../api/api.js";
import Cookies from "universal-cookie";

export default function Dashboard() {
  const [items, setChannels] = useState([]);
  const [fetch, setFetch] = useState(false);
  const cookies = new Cookies();
  console.log(cookies.get("myCat"));
  if (!fetch) {
    channel_list().then((arr) => {
      console.log(arr);
      setChannels(arr);
      setFetch(true);
    });
  }
  return (
    <div>
      <Row>
        {items.length != 0 ? (
          items.map((item) => <ChannelWidget item={item}></ChannelWidget>)
        ) : (
          <h3>No Channels</h3>
        )}
      </Row>
    </div>
  );
}