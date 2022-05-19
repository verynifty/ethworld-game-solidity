// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "./ressource/baseERC20Ressource.sol";

import "openzeppelin-contracts/contracts/access/AccessControlEnumerable.sol";

contract Game is AccessControl {

    mapping(uint256 => baseERC20Ressource) public ressources;
    // balance / ressourcepersec / bonusmultiplier /lasttimeupdated
    mapping(uint256 => mapping(uint256 => uint256[4])) public planetRessources;

    event SetMap(uint256 x, uint256 y, uint256 value);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function registerRessource(uint256 _id, address _ressource) public {
        ressources[_id] = baseERC20Ressource(_ressource);
    }

    function updateBalance(uint256 _planet, uint256 _ressource) public {
        // balance = balance + (ressource per second * (now - last time updated)) * bonusmultiplier
        planetRessources[_planet][_ressource][0] = planetRessources[_planet][_ressource][0] + (planetRessources[_planet][_ressource][1] * (block.timestamp - planetRessources[_planet][_ressource][3]) * planetRessources[_planet][_ressource][2]);
        planetRessources[_planet][_ressource][3] = block.timestamp; 
    }

    function getBalance(uint256 _planet, uint256 _ressource) public view  returns(uint256) {
        // This is copied from the updateBalance()
        return  planetRessources[_planet][_ressource][0] + (planetRessources[_planet][_ressource][1] * (block.timestamp - planetRessources[_planet][_ressource][3]) * planetRessources[_planet][_ressource][2]);
    }

    function exportRessources(
        address _recipient,
        uint256[] calldata _planets,
        uint256[] calldata _ressources,
        uint256[] calldata _amounts
    ) public {
        for (uint256 i; i < _planets.length; i++) {
            if (_amounts[i] <= getBalance(_planets[i], _ressources[i])) {
                ressources[_ressources[i]].mint(_recipient, _amounts[i] - (_amounts[i] * ressources[_ressources[i]].OUTBOND_TRANSFER_TAX()) / 100);
                // remove planet balance
            }
        }
    }

    function importRessources(
        uint256[] calldata _planets,
        uint256[] calldata _ressources,
        uint256[] calldata _amounts
    ) public {
        for (uint256 i; i < _planets.length; i++) {
            planetRessources[_planets[i]][_ressources[i]][0] = planetRessources[_planets[i]][_ressources[i]][0] + _amounts[i];
            ressources[_ressources[i]].forceBurn(msg.sender, _amounts[i]);
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
