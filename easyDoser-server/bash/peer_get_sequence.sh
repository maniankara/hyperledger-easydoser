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
DOCKER=false
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
                --docker)
                    shift
                    DOCKER=${1}
                    shift
                    ;;
                *)
                   echo "${1} is not a recognized flag!"
                   return 1;
                   ;;
          esac
  done  
#export FABRIC_CFG_PATH=$CFG
export CORE_PEER_LOCALMSPID=$MSPID
export ORDERER_ADDRESS=$ADDRESS
#export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
export ORDERER_CA=$PWD/$OCA
export CHANNEL_NAME=$CHANNEL
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/$tls
export CORE_PEER_ADDRESS=$PEER
if $DOCKER = "true"
then
    export PATH=$PATH:/server/bin
    

else
    export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
    export FABRIC_CFG_PATH=$CFG

fi
if test "$FILE" = "null"
then
    peer lifecycle chaincode approveformyorg -o $ADDRESS --channelID $CHANNEL --name $CHAINCODE  --signature-policy $POLICY --sequence 655 --tls --cafile $ORDERER_CA --version $VERSION

else
    peer lifecycle chaincode approveformyorg -o $ADDRESS --channelID $CHANNEL --name $CHAINCODE --collections-config $FILE --signature-policy $POLICY --sequence 655 --tls --cafile $ORDERER_CA --version $VERSION

fi