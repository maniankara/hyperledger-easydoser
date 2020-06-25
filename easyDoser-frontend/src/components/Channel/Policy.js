import { Card, Divider } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import materialColor from 'utils/ColorRandominator.js';
import './channel.css';

export default function Policies(props){
    const hStyle = { color: 'black', size:20 };
    const [expand, setExpand] = useState({});
    const keyArr = Object.keys(props.data.policies);
    const groupArr = Object.keys(props.data.groups)
    
    console.log(keyArr);
    return(
        
    <div className="policy-card">
    
        <h4 style={hStyle}>Modification Policy: </h4>
        <h5 style={hStyle}>{props.data.mod_policy}</h5>
        <GridContainer>
            {
                keyArr.map( key => (
                    (props.data.policies[key].policy.value.identities==null)?
                    (<GridItem xs={12} sm={12} md={4}>
                    <Card className = "card" >
                       
                        <CardBody>
                            <h3 style ={hStyle}>
                                {key}
                            </h3>
                            <h4 style={hStyle}>
                                Rule: 
                            </h4>
                            <p>
                            {props.data.policies[key].policy.value.rule}
                            </p>
                            <h4 style={hStyle}>
                                Sub Policy: 
                            </h4>
                            <p>
                            {props.data.policies[key].policy.value.sub_policy}
                            </p>
                        </CardBody>   
                    </Card>
                    </GridItem>):(
                        <GridItem xs={12} sm={12} md={4}>
                        <Card className = "card" >
                           
                            <CardBody>
                                <h3 style ={hStyle}>
                                    {key}
                                </h3>
                                <h4> Identities: </h4>
                                {
                                    (props.data.policies[key].policy.value.identities.map( identity=>(
                                    <text style={hStyle}><text style={{ fontWeight: 'bold' }}>Name: <t/> <t/> </text> {identity.principal.msp_identifier}<text style={{ fontWeight: 'bold' }}><t/><t/>  Role:  <t/> <t/> </text>{identity.principal.role}<br/></text>
                                        
                                    )))
                                }
                               <h5>{props.data.policies[key].policy.value.rule.n_out_of.n} Sign/Signs Required</h5>
                            </CardBody>   
                        </Card>
                        </GridItem>
                    )
                )

                )
            }
        </GridContainer>
        {
            groupArr.map( name =>(
               
                <div >
                   
                    <br/>
                <Card style={{background:materialColor()}} >
                    <CardHeader>
                        
                    <div className="header">
                    <Row>
                        <Col>
                        <div className="header-name">
                            <h3 style= {hStyle}>{name}</h3>
                        </div>
                        </Col>
                        <Col>
                        <div className="header-toggle" >
                        <IconButton background="primary" onClick={()=>{
                            if(expand[name]){
                                setExpand({...expand,[name]:false}); 
                             }
                             else{
                                setExpand({...expand,[name]:true});
                             }
                        }}>
                           { expand[name]!=true?( <ExpandMoreIcon fontSize="large"/>):(
                               <ExpandLessIcon fontSize="large"/>
                           )}
                        </IconButton>
                       </div>
                        </Col>
                    </Row>
                    </div>
                    </CardHeader>
                    {  console.log(expand)}
                       { expand[name]==true? (
                            <Policies data = {props.data.groups[name]}>

                            </Policies>
                        ):(
                            <p></p>
                        )
                    }
                </Card>
                <br/>
                </div>
                
            )

            )
        }
       <Divider light />
    </div> )
}
Policies.ChannelWidget = {
    data: PropTypes.object,
};