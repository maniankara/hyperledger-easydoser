CFG=""
MSPID=""
TLS=""
MSPCONFIG=""
ADDRESS=""
CHANNEL=""
export PATH=$PATH:/server/bin

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
peer lifecycle chaincode querycommitted -C $CHANNEL
# ./peer_cc_name.sh --cfg /mnt/265C6B275C6AF14B/fabric/config --peer-address localhost:7051 --msp-id "Org1MSP" --msp-config /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/ --tls-cert /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --channel mychannel 
