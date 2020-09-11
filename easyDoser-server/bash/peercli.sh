#!/bin/bash
CFG=""
ADDRESS=""
MSPID=""
MSPCONFIG=""
OCA=""
CHANNEL=""
FILE=""
export PATH=$PATH:/server/bin
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
export ORDERER_CA=$OCA
export CHANNEL_NAME=$CHANNEL
#peer channel fetch config conf.pb -o $ORDERER_ADDRESS -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
peer channel fetch config config_block.pb -o localhost:7050 -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
configtxlator proto_decode --input config_block.pb --type common.Block






#./peercli.sh --cfg "http://localhost:3000/admin/" --orderer-address "localhost:7050" --msp-id "Org1MSP" --msp-config "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" --orderer-certificate "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --channel "mychannel" --filename "1.pb"




##peer channel fetch config config_block.pb -o orderer.example.com:7050 -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
# export CORE_PEER_TLS_ENABLED=true
# export FABRIC_CFG_PATH=${1}/../config/
# echo FABRIC_CFG_PATH
# export CORE_PEER_LOCALMSPID="Org1MSP"
# export CORE_PEER_TLS_ROOTCERT_FILE=${1}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
# export CORE_PEER_MSPCONFIGPATH=${1}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
# export CORE_PEER_ADDRESS=localhost:7051
# export ORDERER_CA=${1}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
# export CHANNEL_NAME=mychannel
#/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
# sh peercli.sh --cfg "/mnt/265C6B275C6AF14B/fabric/config" --orderer-address "localhost:7050" --msp-id "Org1MSP" --msp-config "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" --orderer-certificate "/mnt/265C6B275C6AF14B/fabric/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --channel "mychannel" --filename "1.pb"
