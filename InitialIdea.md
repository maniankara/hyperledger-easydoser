# EaseDoser

## Problem Statement:-

- There are two levels of endorsement policy that acts on a chaincode, channel(namespace) level, and key(collection) level.
- When there get too many channels and collection it gets hard to manage all the data entities and knowing who has access to what.

# The project can have two aspects.

* One is simplifying and providing a table, doc where the developer/operator can take a look at to get to know who has access to which data. This can be implemented at both the levels, probably by the following approach

    1. For Channels -
        1. Check all the channels a peer is a part of.
        2. Get all the chain codes from all the channels.
        3. Get keys(Data entity) from all the channels.
        4. Get a list of all the peers that are part of the channel and map them with the channel's data.

    2. For data collections - 
        1. Some static chain code analyzer to look for private data keys.
        2. Lookup for collection definition.
        3. List of peers/orgs that can interact(r/w) with that data.

    3. All the data that is obtained then can be persisted on the system in some database, or in some simple file for developer/operator to take a reference from.

* Second can be allowing developers/operators to define channels and collections with some simple questions. 
    1. For example, developers/operators might be asked, how many peers will have access to this data, if it’s above some threshold value a new channel with a similar chaincode as the original chaincode with some specific endorsement policy will be created, else a collection can be created. Some other questions can be which peer will have access to data or maybe read-write policies for different peers.

    2. EaseDoser can be GUI or a CLI based tool that can be used to Facilitate development and operations, Or it can be integrated with Hyperledger Fabric itself thus on the introduction of new channel or collection to a peer, some accessibility/endorsement data is written in a DB or in some file(maybe JSON or YAML) and some easy CLI commands that asks questions and define a  channel or collection.
