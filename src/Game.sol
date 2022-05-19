// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "./ressource/baseERC20Ressource.sol";

import "openzeppelin-contracts/contracts/access/AccessControlEnumerable.sol";

contract Game is AccessControl {

    struct Planet { 
   mapping(uint256 => uint256)
}

    mapping(uint256 => uint256) public metal;
    mapping(uint256 => uint256) public food;
    mapping(uint256 => uint256) public crystal;
    mapping(uint256 => uint256) public energy;
    mapping(uint256 => uint256) public coin;

    mapping(address => uint256) public mine;
    mapping(address => uint256) public farm;
    mapping(address => uint256) public powerplant;

    mapping(uint256 => baseERC20Ressource) public ressources;
    mapping(uint256 => mapping(uint256 => uint256)) public map;

    event SetMap(uint256 x, uint256 y, uint256 value);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function registerRessource(uint256 _id, address _ressource) public {
        ressources[_id] = baseERC20Ressource(_ressource);
    }

    function getXY(uint256 x, uint256 y) public view returns (uint256) {
        return map[x][y];
    }

    function setXY(
        uint256 x,
        uint256 y,
        uint256 value
    ) internal {
        require(map[x][y] == 0, "map already set");
        map[x][y] = value;
        emit SetMap(x, y, value);
    }

    function exportRessource(
        uint256[] calldata _planet,
        uint256[] calldata _quantity,
        uint256[] calldata _amount
    ) public {
        for (uint256 i; i < _planet.length; i++) {

        }
    }

    function importRessource(
        uint256[] calldata _planet,
        uint256[] calldata _quantity,
        uint256[] calldata _amount
    ) public {
        for (uint256 i; i < _planet.length; i++) {
            
        }
    }

    function useRessource(
        address _ressource,
        address _user,
        address _amount
    ) public {
        require(tx.origin == _user, "No rights to use the ressource.");
    }

    function craft(address _ressource, uint256 _quantity) public {}

    function sampleNoise() public pure {}
}
