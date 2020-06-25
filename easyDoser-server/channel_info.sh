#!/bin/bash
docker exec -t cli bash -c  "configtxlator proto_decode --input $1 --type common.Block";