CHANNEL=""
PEER=""
CHAINCODE=""
TLS=""
IDPATH=""
KEYPATH=""
MSPID=""
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
                *)
                   echo "${1} is not a recognized flag!"
                   return 1;
                   ;;
          esac
  done  

discover endorsers --peerTLSCA $TLS --userCert $IDPATH --userKey $KEYPATH --MSP $MSPID --channel $CHANNEL  --server $PEER --chaincode $CHAINCODE
# discover endorsers  --peerTLSCA /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --userKey /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/priv_sk --userCert /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/User1@org1.example.com-cert.pem --MSP Org1MSP --server localhost:7051 --channel mychannel --chaincode marblesp
#./discover_endorsement_policy.sh --user-cert /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts/User1@org1.example.com-cert.pem --keypath /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/priv_sk --msp-id Org1MSP --tls /mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peer-address localhost:7051 --channel mychannel --chaincode marblesp