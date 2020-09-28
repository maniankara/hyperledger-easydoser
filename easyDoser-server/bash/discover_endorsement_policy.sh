CHANNEL=""
PEER=""
CHAINCODE=""
TLS=""
IDPATH=""
KEYPATH=""
MSPID=""
DOCKER="false"
while test $# -gt 0; do
           case "$1" in
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
                --tls)
                    shift
                    TLS=${1}
                    shift
                    ;;
                --user-cert)
                    shift
                    IDPATH=${1}
                    shift
                    ;;
                --keypath)
                    shift
                    KEYPATH=${1}
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
if $DOCKER = "true"
then
    export PATH=$PATH:/server/bin
    

else
    export CORE_PEER_MSPCONFIGPATH=$MSPCONFIG
    export FABRIC_CFG_PATH=$CFG

fi
discover endorsers --peerTLSCA $PWD/$TLS --userCert $PWD/$IDPATH --userKey $PWD/$KEYPATH --MSP $MSPID --channel $CHANNEL  --server $PEER --chaincode $CHAINCODE
