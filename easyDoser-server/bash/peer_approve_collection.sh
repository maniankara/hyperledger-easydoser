#!/bin/bash
CFG=""
ADDRESS=""
MSPID=""
MSPCONFIG=""
PEER=""
OCA=""
CHANNEL=""
FILE=""
POLICY=""
CHAINCODE=""
tls=""
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
                --peer-address)
                    shift
                    PEER=${1}
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
                --tls-cert)
                    shift
                    tls=${1}
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
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=$tls
export CORE_PEER_ADDRESS=$PEER

peer lifecycle chaincode approveformyorg -o $ADDRESS --channelID $CHANNEL --name $CHAINCODE --collections-config $FILE --signature-policy $POLICY --sequence $SEQUENCE --tls --cafile $ORDERER_CA --version $VERSION> op.txt
#./peer_get_sequence.sh --cfg "/mnt/265C6B275C6AF14B/fabric/config" --orderer-address "localhost:7050" --msp-id "Org1MSP" --msp-config "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" --orderer-certificate "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --channel "mychannel" --filename cc.json --chaincode marblesp --policy "OR('Org1MSP.member','Org2MSP.member')" --sequence 3 --version "2.0" --tls-cert /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peer-address localhost:7051

#peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name marblesp --version 1.0 --sequence 2 --collections-config cc.json --signature-policy "OR('Org1MSP.member','Org2MSP.member')" --tls --cafile $ORDERER_CA --peerAddresses localhost:7051 --tlsRootCertFiles $ORG1_CA --peerAddresses localhost:9051 --tlsRootCertFiles $ORG2_CA
#peer lifecycle chaincode approveformyorg -o localhost:7050  --channelID mychannel --name marblesp --version 1.0 --collections-config cc.json --signature-policy "OR('Org1MSP.member','Org2MSP.member')"  --sequence 2 --tls --cafile $ORDERER_CA
