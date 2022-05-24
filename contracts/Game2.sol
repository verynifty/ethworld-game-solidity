// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./BaseERC20Ressource.sol";

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./Planet.sol";

contract Game2 is AccessControl {

    struct PlanetInfos {
        uint256 r1Balance;
        uint256 r1Level;
        uint256 r1LastUpdate;
        uint256 r1MaxStorage;
    }

    mapping(uint256 => PlanetInfos) planetInfos;

    uint256 public constant R1_START_AMOUNT = 1000;

    Planet public planetNFT;

    constructor(address _planetNFT) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        planetNFT = Planet(_planetNFT);
    }

    function newPlanet(uint256 _id) public {
        planetInfos[_id] = PlanetInfos(
            300 ether,
            0,
            block.timestamp,
            10000 ether
        );
        planetNFT.mint(msg.sender, _id);
    }
}