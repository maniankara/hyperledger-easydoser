CFG=""
MSPID=""
TLS=""
MSPCONFIG=""
ADDRESS=""
CHANNEL=""
CC=""
DOCKER="false"
while test $# -gt 0; do
           case "$1" in
                --cfg)
                    shift
                    CFG=${1}
                    shift
                    ;;
                --peer-address)
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
                --tls-cert)
                    shift
                    TLS=${1}
                    shift
                    ;;
                --channel)
                    shift
                    CHANNEL=${1}
                    shift
                    ;;
                --chaincode)
                    shift
                    CC=${1}
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
export CORE_PEER_TLS_ENABLED=true
#export FABRIC_CFG_PATH=$CFG
export CORE_PEER_LOCALMSPID=$MSPID
export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/$TLS
#export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
export CORE_PEER_ADDRESS=$ADDRESS
if $DOCKER = "true"
then
    export PATH=$PATH:/server/bin
    

else
    export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
    export FABRIC_CFG_PATH=$CFG

fi
peer lifecycle chaincode querycommitted --name $CC --channelID $CHANNEL --output json
