#!/bin/bash
CFG=""
ADDRESS=""
MSPID=""
MSPCONFIG=""
OCA=""
CHANNEL=""
FILE=""
DOCKER="false"
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
if $DOCKER = "true"
then
    export PATH=$PATH:/server/bin
    

else
    export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
    export FABRIC_CFG_PATH=$CFG

fi
echo $FABRIC_CFG_PATH>abc.txt

#peer channel fetch config conf.pb -o $ORDERER_ADDRESS -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
peer channel fetch config conf.pb -o localhost:7050 -c $CHANNEL_NAME --tls --cafile $ORDERER_CA >err.txt
configtxlator proto_decode --input conf.pb --type common.Block

