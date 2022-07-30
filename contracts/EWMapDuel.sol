//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract EWMapDuel {
    uint256 public constant ONE_PER_SEC = 3600;

    /*

        1 0 0 0 X
        0 0 0 0 0
        0 0 X 0 0
        0 0 0 0 0
        X 0 0 0 2
    */

    struct MapDef {
        uint256 perHour;
        uint256 balance;
        uint256 player;
        uint256 position;
    }

    string public name = "Duel";
    uint256 public players = 2;
    uint256 public width = 5;
    uint256 public mapDefSize;
    uint256 public aps = 1e18; // Actions per seconds

    MapDef[] public defs;

    constructor() {
        defs.push(MapDef(ONE_PER_SEC, 1, 0, getPos(0, 0)));
        /*
        map[getPos(4, 4)] = MapTile(ONE_PER_SEC, 2, 0);

        map[getPos(2, 2)] = MapTile(ONE_PER_SEC, 0, 20);
        map[getPos(4, 0)] = MapTile(ONE_PER_SEC, 0, 10);
        map[getPos(0, 4)] = MapTile(ONE_PER_SEC, 0, 10);
        */
    }

    function getDef(uint256 _position)
        public
        view
        returns (MapDef memory def)
    {
       def = defs[_position];
    }

    function getPos(uint256 x, uint256 y)
        public
        view
        returns (uint256 position)
    {
        position = (x % width) + y * width;
    }

    function getSize()
        public
        view
        returns (uint256 )
    {
       return defs.length;
    }



}
