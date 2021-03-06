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
        EWMapDuel map = maps[games[nbGames].map];
        for (uint256 index; index < map.getSize(); index++) {
            EWMapDuel.MapDef memory def = map.getDef(index);
            gamesMap[nbGames][def.position] = Tile(def.perHour, def.balance, def.player, block.timestamp);
        }
        nbGames++;
    }

    function getTile(uint256 _game, uint256 _x, uint256 _y) public view returns (
        address owner,
        uint256 units,
        uint256 perHour,
        uint256 balance,
        uint256 lastUpdate
    ) {
       // MapTile memory mtile = maps[games[_game].map];
        
    }

    function move(uint256 _game, uint256 _amount, uint256 _from, uint256 _to) public {
        Tile storage from = gamesMap[_game][_from];
        require(msg.sender == games[_game].players[from.player], "Can only move own army.");
        Tile storage to = gamesMap[_game][_to];
        from.balance = from.balance - _amount;
        if (from.player == to.player) {
            // it's just a transfer from player to player
            to.balance = to.balance + _amount;
        } else {
            // here is an attack
            if (from.balance > to.balance) {
                // just removing some units
                to.balance = to.balance - _amount;
            } else {
                // conquering the tile
                to.balance = _amount - to.balance;
                to.player = from.player;
            }
        }
    }

}
