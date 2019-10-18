pragma solidity ^0.4.21;

contract Document {

    string    public data;
    address[] public links;

    constructor(string newData, address[] newLinks) public {
        data = newData;
        links = newLinks;
    }
}

// "", [0xE0f5206BBD039e7b0592d8918820024e2a7437b9]