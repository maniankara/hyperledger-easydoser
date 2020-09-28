FROM golang:1.12-stretch

WORKDIR /server
COPY easyDoser-server/ /server
COPY easyDoser-server/commands/ /server/commands
COPY easyDoser-server/bash/ /server/bash
RUN go get -d github.com/gorilla/mux
RUN mkdir config
RUN mkdir mspconfig
RUN ls bin
EXPOSE 8080
RUN curl -L --retry 5 --retry-delay 3 "https://github.com/hyperledger/fabric/releases/download/v2.2.0/hyperledger-fabric-linux-amd64-2.2.0.tar.gz" | tar xz

CMD ["go", "run" , "main.go"]