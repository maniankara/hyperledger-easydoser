#!/bin/bash
CFG=""
ADDRESS=""
MSPID=""
MSPCONFIG=""
OCA=""
CHANNEL=""
FILE=""
POLICY=""
CHAINCODE=""
SEQUENCE=0
VERSION=1.0
while test $# -gt 0; do
           case "$1" in
                --cfg)
                    shift
                    CFG=${1}
                    shift
                    ;;
                --orderer-address)
                    shift
                    ADDRESS=${1}
                    shift
                    ;;
                --msp-id)
                    shift
                    MSPID=${1}
                    shift
                    ;;
                --msp-config)
                    shift
                    MSPCONFIG=${1}
                    shift
                    ;;
                --orderer-certificate)
                    shift
                    OCA=${1}
                    shift
                    ;;
                --channel)
                    shift
                    CHANNEL=${1}
                    shift
                    ;;
                --filename)
                    shift
                    FILE=${1}
                    shift
                    ;;
                --chaincode)
                    shift
                    CHAINCODE=${1}
                    shift
                    ;;
                --policy)
                    shift
                    POLICY=${1}
                    shift
                    ;;
                --sequence)
                    shift
                    SEQUENCE=${1}
                    shift
                    ;;
                --version)
                    shift
                    VERSION=${1}
                    shift
                    ;;
                *)
                   echo "${1} is not a recognized flag!"
                   return 1;
                   ;;
          esac
  done  
export FABRIC_CFG_PATH=$CFG
export CORE_PEER_LOCALMSPID=$MSPID
export ORDERER_ADDRESS=$ADDRESS
export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
export ORDERER_CA=$OCA
export CHANNEL_NAME=$CHANNEL
echo $VERSION
peer lifecycle chaincode approveformyorg -o $ORDERER_ADDRESS --channelID $CHANNEL --name $CHAINCODE --collections-config $FILE --signature-policy $POLICY  --sequence $SEQUENCE --tls --cafile $ORDERER_CA --version $VERSION 
#./peer_approve_collection.sh --cfg "/mnt/265C6B275C6AF14B/fabric/config" --orderer-address "localhost:7050" --msp-id "Org2MSP" --msp-config "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp" --orderer-certificate "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --channel "mychannel" --filename "cc.json" --chaincode marblesp --policy "OR('Org1MSP.member','Org2MSP.member')" --sequence 3 --version "2.0"

#peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name marblesp --version 1.0 --sequence 2 --collections-config cc.json --signature-policy "OR('Org1MSP.member','Org2MSP.member')" --tls --cafile $ORDERER_CA --peerAddresses localhost:7051 --tlsRootCertFiles $ORG1_CA --peerAddresses localhost:9051 --tlsRootCertFiles $ORG2_CA
#peer lifecycle chaincode approveformyorg -o localhost:7050  --channelID mychannel --name marblesp --version 1.0 --collections-config cc.json --signature-policy "OR('Org1MSP.member','Org2MSP.member')"  --sequence 2 --tls --cafile $ORDERER_CA
