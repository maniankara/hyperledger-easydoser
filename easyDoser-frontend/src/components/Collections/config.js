import React from "react";
import PropTypes from "prop-types";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";

export default function CConfig (props) {
    var items = props.config.collections.config;
    console.log(props.config)
    console.log(items)
    var empty= false;
    if(props.config.collections.config=== undefined){
        empty= true;
    }
    return empty?(
    <text style={{ fontWeight: 'bold' }}>
        <br/>
        No private Data Collections in the Chaincode
    </text>):(
        <div>
           {
               items.map((item)=>
               <GridItem xs={12} sm={12} md={12}>
                <Card classname="card">
                    <CardHeader>
                        <h3>
                            {item.Payload.StaticCollectionConfig.name}
                        </h3>
                    </CardHeader>
                    <CardBody>
                        <text>
                            <text style={{ fontWeight: 'bold' }}>Blocks to live:<br/> </text>
                            {item.Payload.StaticCollectionConfig.block_to_live}
                        </text>
                        <text>
                            <text style={{ fontWeight: 'bold' }}><br/>Member peer count:<br/> </text>
                            {item.Payload.StaticCollectionConfig.maximum_peer_count.toString()}
                        </text>
                        <text>
                            <text style={{ fontWeight: 'bold' }}><br/>Member only Read:<br/> </text>
                            {item.Payload.StaticCollectionConfig.member_only_read.toString()}<br/>
                        </text>
                        <text  style={{ fontWeight: 'bold' }} > 
                            Members:<br/>
                        </text>
                        {
                            item.Payload.StaticCollectionConfig.member_orgs_policy.Payload.SignaturePolicy.identities.map((id)=>
                                <text>{atob(id.principal)}<br/></text>
                            )
                        }
                        <text>
                            <text style={{ fontWeight: 'bold' }}><br/>Signs Required:<br/> </text>
                            {item.Payload.StaticCollectionConfig.member_orgs_policy.Payload.SignaturePolicy.rule.Type.NOutOf.n.toString()}
                        </text>
                    </CardBody>
                </Card>
               </GridItem>
               )
           }
        </div>
    );
}
CConfig.ChannelWidget = {
    config: PropTypes.object
  };