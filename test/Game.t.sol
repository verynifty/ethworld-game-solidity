// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "forge-std/Test.sol";
import "../src/Game.sol";

import "../src/ressource/metal.sol";
import "../src/ressource/food.sol";
import "../src/ressource/crystal.sol";

contract ContractTest is Test {
    Metal public metal;
    Food public food;
    Crystal public crystal;

    Game public game;

    function setUp() public {
        game = new Game();

        /* Add Ressources */
        metal = new Metal();
        metal.grantRole(metal.MINTER_ROLE(), address(game));
        game.registerRessource(0, address(metal));

        food = new Food();
        food.grantRole(food.MINTER_ROLE(), address(game));
        game.registerRessource(1, address(food));

        crystal = new Crystal();
        crystal.grantRole(crystal.MINTER_ROLE(), address(game));
        game.registerRessource(2, address(crystal));
    }

    function testExample() public {
        assertTrue(true);
    }
}