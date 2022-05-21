// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./BaseERC20Ressource.sol";

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./Planet.sol";

contract Game is AccessControl {
    struct Ressource {
        BaseERC20Ressource token;
        uint256 baseProductionPerSecond; // How much ressource are generater per second
        uint256 outTransferTax; // Percent of ressources kept when transfering to ERC20
        uint256 startingBalance;
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
        planetRessources[_id][0][0] = ressources[0].startingBalance;

        planetRessources[_id][1][3] = block.timestamp;
        planetRessources[_id][1][0] = ressources[1].startingBalance;

        planetRessources[_id][2][3] = block.timestamp;
        planetRessources[_id][2][0] = ressources[2].startingBalance;

        planetNFT.mint(msg.sender, _id);
        emit newPlanetMinted(_id);
    }

    function registerRessource(
        uint256 _id,
        address _ressource,
        uint256 _baseProductionPerSecond,
        uint256 _outTransferTax,
        uint256 _startingBalance
    ) public {
        ressources[_id] = Ressource(
            BaseERC20Ressource(_ressource),
            _baseProductionPerSecond,
            _outTransferTax,
            _startingBalance
        );
    }

    function getPlanetInfos(uint256 _planet)
        public
        view
        returns (
            uint256 r1,
            uint256 r2,
            uint256 r3
        )
    {
        r1 = getBalance(_planet, 0);
        r2 = getBalance(_planet, 1);
        r3 = getBalance(_planet, 2);
    }

    function updateBalance(uint256 _planet, uint256 _ressource) public {
        uint256 level = planetRessources[_planet][_ressource][1];
        // balance = balance + (BASEPRODUCTION * LEVEL * 1.1 ^ LEVEL)
        uint256 newBalance = planetRessources[_planet][_ressource][0] +
            (ressources[_ressource].baseProductionPerSecond *
                level *
                1**level *
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
        uint256 level = planetRessources[_planet][_ressource][1];
        // balance = balance + (BASEPRODUCTION * LEVEL * 1.1 ^ LEVEL)
        uint256 newBalance = planetRessources[_planet][_ressource][0] +
            (ressources[_ressource].baseProductionPerSecond *
                level *
                1**level *
                (block.timestamp - planetRessources[_planet][_ressource][3]) *
                planetRessources[_planet][_ressource][2]); // This is copied from the updateBalance() NEED TO BE UPDATED
        return newBalance;
    }

    function upgradeRessource(uint256 _planet, uint256 _ressource) public {
        uint256 cost = 1 ether;
        updateBalance(_planet, _ressource);
       // _useRessource(_planet, _ressource, cost);
        planetRessources[_planet][_ressource][1] += 1;
    }

    function _useRessource(
        uint256 _planet,
        uint256 _ressource,
        uint256 _amount
    ) internal {
        if (planetRessources[_planet][_ressource][0] < _amount) {
            updateBalance(_planet, _ressource);
        }
        planetRessources[_planet][_ressource][0] -= _amount;
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
