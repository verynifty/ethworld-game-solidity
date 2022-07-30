//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./EWMapDuel.sol";

contract EWEngine {
    
    struct Tile {
        uint256 perHour;
        uint256 balance;
        uint256 player;
        uint256 lastUpdate;
    }

    struct Game {
        uint256 startTime;
        uint256 map;
        address[] players;
    }

    mapping(uint256 => mapping(uint256 => Tile)) public gamesMap;
    mapping(uint256 => Game) public games;
    mapping(uint256 => EWMapDuel) public maps;

    uint256 public nbMaps;
    uint256 public nbGames;

    constructor() {
        
    }

    function newMap(address _mapAddress) public {
        maps[nbMaps] = EWMapDuel(_mapAddress);
        nbMaps++;
    }

    function newGame(address[] memory _players, uint256 _map) public {
        games[nbGames] = Game(block.timestamp, _map, _players);
        nbGames++;
    }

    function getTile(uint256 x, uint256 y) public view returns (string memory) {
        return "";
    }

}
