    import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";

export default function Policy (props) {
    var items = props.policy[0].EndorsersByGroups;
 
    var len = Object.values(items).length;
    var policyLen = props.policy[0].Layouts.length;
    var sPolicy = len<policyLen?"AND":"OR";
    return(
        <div>
            <h3>Policy</h3>
            <h4>{sPolicy}</h4>
            <h3>Memebers</h3>
           {
               Object.values(items).map((value)=>
              
                <Card classname="card">
                    <CardHeader>
                        <h3>
                            {value[0].MSPID}
                        </h3>
                    </CardHeader>
                  
                </Card>
             
               )
           }
        </div>
    );
}
Policy.ChannelWidget = {
    policy: PropTypes.object
  };