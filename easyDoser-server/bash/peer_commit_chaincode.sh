#!/bin/bash
CFG=""
ADDRESS=""
MSPID=""
MSPCONFIG=""
OCA=""
CHANNEL=""
COLLECTION=""
CHAINCODE=""
VERSION=""
POLICY=""
ORGS=""
TLS=""
SEQUENCE=""
PEER=""
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
                --chaincode)
                    shift
                    CHAINCODE=${1}
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
                --policy)
                    shift
                    POLICY=${1}
                    shift
                    ;;
                --orgs)
                    shift
                    ORGS=${1}
                    shift
                    ;;
                --tls)
                    shift
                    TLS=${1}
                    shift
                    ;;
                --collection)
                    shift
                    COLLECTION=${1}
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
export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/$TLS
if $DOCKER = "true"
then
    export PATH=$PATH:/server/bin
    

else
    export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
    export FABRIC_CFG_PATH=$CFG

fi
if test "$COLLECTION" = "null"
then
    peer lifecycle chaincode commit -o $ORDERER_ADDRESS --channelID $CHANNEL_NAME --name $CHAINCODE --version $VERSION --sequence $SEQUENCE --signature-policy $POLICY --tls --cafile $ORDERER_CA $ORGS
else 
    peer lifecycle chaincode commit -o $ORDERER_ADDRESS --channelID $CHANNEL_NAME --name $CHAINCODE --version $VERSION --sequence $SEQUENCE  --collections-config config.json  --signature-policy $POLICY --tls --cafile $ORDERER_CA $ORGS
fi
