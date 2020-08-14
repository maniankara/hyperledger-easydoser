#!/bin/bash
CFG=""
ADDRESS=""
MSPID=""
MSPCONFIG=""
OCA=""
CHANNEL=""
CC=""
VERSION=""
SEQUENCE=""
POLICY=""
APPROVAL=""
PEER=""
TLS=""
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
                --peer-address)
                    shift
                    PEER=${1}
                    shift
                    ;;
                --tls-certificate)
                    shift
                    TLS=${1}
                    shift
                    ;;
                --channel)
                    shift
                    CHANNEL=${1}
                    shift
                    ;;
                --cc)
                    shift
                    CC=${1}
                    shift
                    ;;
                --policy)
                    shift
                    POLICY=${1}
                    shift
                    ;;
                --approval-policy)
                    shift
                    APPROVAL=${1}
                    shift
                    ;;
                --version)
                    shift
                    VERSION=${1}
                    shift
                    ;;
                --sequence)
                    shift
                    SEQUENCE=${1}
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
export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
export ORDERER_ADDRESS=$ADDRESS
export ORDERER_CA=$OCA
export CHANNEL_NAME=$CHANNEL
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=$TLS
export CORE_PEER_ADDRESS=$PEER
if test "$POLICY" = "null"
then
    peer lifecycle chaincode checkcommitreadiness -o $ADDRESS --channelID $CHANNEL --tls --cafile $OCA --name $CC --version $VERSION --sequence $SEQUENCE --signature-policy $APPROVAL

else
    peer lifecycle chaincode checkcommitreadiness -o $ADDRESS --channelID $CHANNEL --tls --cafile $OCA --name $CC --version $VERSION --sequence $SEQUENCE --collections-config commit.json --signature-policy $APPROVAL

fi
#./peer_commit_ready.sh --cfg /mnt/265C6B275C6AF14B/fabric/config --orderer-address localhost:7050 --orderer-certificate /mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --channel mychannel --cc marblesp --policy config.json --approval-policy "OR('Org1MSP.member','Org2MSP.member')" --version "1.3" --sequence 3 --msp-config /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp --peer-address localhost:7051 --msp-id Org1MSP --tls-certificate /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt