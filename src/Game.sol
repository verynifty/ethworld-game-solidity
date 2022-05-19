// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "./IRessource.sol";

contract Game {

    mapping(address => IRessource) public fungible;

    function registerRessource(address _ressource) public {
        ressource[_ressource] = IRessource(_ressource);
    }

    function useRessource(address _ressource, address _user, address _amount) public {
        require(tx.origin == _user, "No rights to burn ressource of others");
    }

    function craft(address _ressource, uint256 _quantity) public {

    }

    function sampleNoise() public pure {
      
    }

}
