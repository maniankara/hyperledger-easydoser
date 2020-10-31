# hyperledger-easydoser

## Project architecture
![alt text](https://i.imgur.com/YBCIXio.jpg)
## Some prerequisite
1. Make sure you have hyperledger Fabric up and running. You can find instructions to get started with habric [here.](https://hyperledger-fabric.readthedocs.io/en/release-2.2/getting_started.html)
2. If you are simply using sample networks a `docker ps` would look something like this 
```
Ensure the hyperledger fabric is running:
hyperledger/fabric-samples/test-network|master ⇒  docker ps
CONTAINER ID        IMAGE                                                                                                                                                                    COMMAND                  CREATED             STATUS              PORTS                              NAMES
beabb85a8e55        dev-peer0.org2.example.com-basic_1.0-4ec191e793b27e953ff2ede5a8bcc63152cecb1e4c3f301a26e22692c61967ad-6c0d5b0755cb92ed5555bd2e8a8765a6f425d1ed5ed9a90e625e01939e2113be   "chaincode -peer.add…"   About an hour ago   Up About an hour                                       dev-peer0.org2.example.com-basic_1.0-4ec191e793b27e953ff2ede5a8bcc63152cecb1e4c3f301a26e22692c61967ad
45fad38301ca        dev-peer0.org1.example.com-basic_1.0-4ec191e793b27e953ff2ede5a8bcc63152cecb1e4c3f301a26e22692c61967ad-42f57faac8360472e47cbbbf3940e81bba83439702d085878d148089a1b213ca   "chaincode -peer.add…"   About an hour ago   Up About an hour                                       dev-peer0.org1.example.com-basic_1.0-4ec191e793b27e953ff2ede5a8bcc63152cecb1e4c3f301a26e22692c61967ad
7adb159c312d        hyperledger/fabric-peer:latest                                                                                                                                           "peer node start"        About an hour ago   Up About an hour    0.0.0.0:7051->7051/tcp             peer0.org1.example.com
71e30ee0bf3f        hyperledger/fabric-peer:latest                                                                                                                                           "peer node start"        About an hour ago   Up About an hour    7051/tcp, 0.0.0.0:9051->9051/tcp   peer0.org2.example.com
894c1bb2e0ee        hyperledger/fabric-orderer:latest                                                                                                                                        "orderer"                About an hour ago   Up About an hour    0.0.0.0:7050->7050/tcp             orderer.example.com
hyperledger/fabric-samples/test-network|master ⇒  

```
3. Make sure you have path to fabric binaries in your env PATH variable.
## Run Project with release files.
1. Install npm, you can find instructions [here.](https://www.npmjs.com/get-npm)
2. Install serve with `npm install -g serve`
3. Download latest release zip from [release section of the repo](https://github.com/Abhimanyu121/hyperledger-easydoser/releases/).
4. Extract the zip and inside the extract directory run `./start.sh`
5. To stop, simply press ctrl+c twice.
## Instructions to run the project without docker
1. Clone the repo and go to easydoser dir.
2. Run the following
    - `cd easyDoser-server`
    - `go get -u github.com/gorilla/mux`
    - `go build`
    - `sudo ./easdoser-server`
    - `cd ../easyDoser-frontend`
    - `npm install`
    - `npm start`
3. In frontend set absolute path of Core Config dir and MspConfig dir, set addresses of Orderer and peer and finally pick the given files.
4. Untick running on docker and provide additional information.
5. Save the details and check channel policies
## Instructions to run the project with docker
1. Clone the repo and go to easydoser dir.
2. Run the following (make sure you are root user to interact with docker deamon)
    - Open docker-compose.yml and set Core config path to be mounted(line 9), it should somewhat like
    `- /run/media/abhimanyu/265C6B275C6AF14B/fabric/config:/config`
    - Set MSPConfig Path in docker-compose.yml to be mounted (line 10), it should look somewhat like
    `- /run/media/abhimanyu/265C6B275C6AF14B/fabric/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp:/mspconfig`
    - `docker-compose up`

## Video instructions to run the project
[![asciicast](https://asciinema.org/a/355175.svg)](https://asciinema.org/a/355175)
## A little demo
<img src="https://imgur.com/8cDvWSN.gif"/></br>
You can find much detailed video [here.](https://youtu.be/pGrJxVJ84WQ)
