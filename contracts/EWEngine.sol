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
        uint256 width;
        uint256 height;
    }

    mapping(uint256 => mapping(uint256 => Tile)) public gamesMap;
    mapping(uint256 => Game) public games;
    mapping(uint256 => EWMapDuel) public maps;

    uint256 public nbMaps;
    uint256 public nbGames;

    constructor() {}

    function newMap(address _mapAddress) public {
        maps[nbMaps] = EWMapDuel(_mapAddress);
        nbMaps++;
    }

    function newGame(address[] memory _players, uint256 _map) public {
        EWMapDuel map = maps[games[nbGames].map];
        games[nbGames] = Game(
            block.timestamp,
            _map,
            _players,
            map.width(),
            map.height()
        );
        for (uint256 index; index < map.getSize(); index++) {
            EWMapDuel.MapDef memory def = map.getDef(index);
            gamesMap[nbGames][def.position] = Tile(
                def.perHour,
                def.balance,
                def.player,
                block.timestamp
            );
        }
        nbGames++;
    }

    function getTileBalance(uint256 _game, uint256 _pos)
        public
        view
        returns (uint256)
    {
        Tile memory tile = gamesMap[_game][_pos];
        if (tile.perHour == 0) {
            return tile.balance;
        } else {
            //calculate balance with perhour / lastupdate
            return tile.balance;
        }
    }

    function getTile(uint256 _game, uint256 _pos)
        public
        view
        returns (
            uint256 player,
            uint256 units,
            uint256 perHour,
            uint256 balance,
            uint256 lastUpdate
        )
    {
        Tile memory tile = gamesMap[_game][_pos];
        player = tile.player;
        units = tile.balance;
        perHour = tile.perHour;
        lastUpdate = tile.lastUpdate;
    }

    function move(
        uint256 _game,
        uint256 _amount,
        uint256 _from,
        uint256 _to
    ) public {
        Tile storage from = gamesMap[_game][_from];
        require(
            msg.sender == games[_game].players[from.player],
            "Can only move own army."
        );
        Tile storage to = gamesMap[_game][_to];
        uint256 effectiveAmont = from.balance < _amount
            ? from.balance
            : _amount;
        from.balance = from.balance - effectiveAmont;
        if (from.player == to.player) {
            // it's just a transfer from player to player
            to.balance = to.balance + effectiveAmont;
        } else {
            // here is an attack
            if (effectiveAmont > to.balance) {
                // just removing some units
                to.balance = to.balance - effectiveAmont;
            } else {
                // conquering the tile
                to.balance = effectiveAmont - to.balance;
                to.player = from.player;
            }
        }
    }
}
