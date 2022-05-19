// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "./IRessource.sol";

contract Game {


    mapping(address => IRessource) public ressource;

    function registerRessource(address _ressource) public {
        ressource[_ressource] = IRessource(_ressource);
    }

    function sampleNoise() public pure {
      
    }

}
