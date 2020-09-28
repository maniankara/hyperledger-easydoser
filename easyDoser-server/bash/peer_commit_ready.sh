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
#export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
export ORDERER_ADDRESS=$ADDRESS
export ORDERER_CA=$PWD/$OCA
export CHANNEL_NAME=$CHANNEL
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/$TLS
export CORE_PEER_ADDRESS=$PEER
if $DOCKER = "true"
then
    export PATH=$PATH:/server/bin
    

else
    export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
    export FABRIC_CFG_PATH=$CFG

fi
if test "$POLICY" = "null"
then
    peer lifecycle chaincode checkcommitreadiness -o $ADDRESS --channelID $CHANNEL --tls --cafile $OCA --name $CC --version $VERSION --sequence $SEQUENCE --signature-policy $APPROVAL

else
    peer lifecycle chaincode checkcommitreadiness -o $ADDRESS --channelID $CHANNEL --tls --cafile $OCA --name $CC --version $VERSION --sequence $SEQUENCE --collections-config commit.json --signature-policy $APPROVAL

fi
