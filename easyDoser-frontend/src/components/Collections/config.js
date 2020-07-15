import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import materialColor from 'utils/ColorRandominator.js';

export default function CC_config (props) {
    var items = props.config.collections.config;
    console.log(items)
    return(
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
CC_config.ChannelWidget = {
    config: PropTypes.object
  };