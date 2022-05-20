// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "./ressource/baseERC20Ressource.sol";

import "openzeppelin-contracts/contracts/access/AccessControlEnumerable.sol";
import "./Planet.sol";

contract Game is AccessControl {
    struct Ressource {
        baseERC20Ressource token;
        uint256 baseProductionPerSecond;
        uint256 outTransferTax;
    }

    mapping(uint256 => Ressource) public ressources;

    // balance / production level / bonusmultiplier /lasttimeupdated / maxstorage
    mapping(uint256 => mapping(uint256 => uint256[5])) public planetRessources;

    uint256 public constant MAX_STORAGE_BASE = 1000;
    uint256 public constant ONE_PER_MINUTE = 16660000000000000;

    event newPlanetMinted(uint256 id);

    Planet public planetNFT;

    constructor(address _planetNFT) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        planetNFT = Planet(_planetNFT);
    }

    function newPlanet(uint256 _id) public {
        planetRessources[_id][0][3] = block.timestamp;
        planetRessources[_id][0][0] = 200 ether;

        planetRessources[_id][1][3] = block.timestamp;
        planetRessources[_id][1][0] = 100 ether;

        planetRessources[_id][2][3] = block.timestamp;
        planetRessources[_id][2][0] = 300 ether;

        planetNFT.mint(msg.sender, _id);
        emit newPlanetMinted(_id);
    }

    function registerRessource(
        uint256 _id,
        address _ressource,
        uint256 _baseProductionPerSecond,
        uint256 _outTransferTax
    ) public {
        ressources[_id] = Ressource(
            baseERC20Ressource(_ressource),
            _baseProductionPerSecond,
            _outTransferTax
        );
    }

    function updateBalance(uint256 _planet, uint256 _ressource) public {
        // balance = balance + (BASEPRODUCTION * LEVEL * 1.1 ^ LEVEL)
        uint256 newBalance = planetRessources[_planet][_ressource][0] +
            (planetRessources[_planet][_ressource][1] *
                (block.timestamp - planetRessources[_planet][_ressource][3]) *
                planetRessources[_planet][_ressource][2]);
        // The balnce is capped depending on the storage cpacity of the planet
        planetRessources[_planet][_ressource][0] = newBalance <
            planetRessources[_planet][_ressource][4]
            ? newBalance
            : planetRessources[_planet][_ressource][4];
        planetRessources[_planet][_ressource][3] = block.timestamp;
    }

    function getBalance(uint256 _planet, uint256 _ressource)
        public
        view
        returns (uint256)
    {
        // This is copied from the updateBalance() NEED TO BE UPDATED
        return 0;
    }

    function exportRessources(
        address _recipient,
        uint256[] calldata _planets,
        uint256[] calldata _ressources,
        uint256[] calldata _amounts
    ) public {
        for (uint256 i; i < _planets.length; i++) {
            if (_amounts[i] <= getBalance(_planets[i], _ressources[i])) {
                ressources[_ressources[i]].token.mint(
                    _recipient,
                    _amounts[i] -
                        (_amounts[i] *
                            ressources[_ressources[i]].outTransferTax) /
                        100
                );
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
            planetRessources[_planets[i]][_ressources[i]][0] =
                planetRessources[_planets[i]][_ressources[i]][0] +
                _amounts[i];
            ressources[_ressources[i]].token.forceBurn(msg.sender, _amounts[i]);
        }
    }

    function craft(address _ressource, uint256 _quantity) public {}

    function sampleNoise() public pure {}
}
