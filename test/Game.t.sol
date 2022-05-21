// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "forge-std/Test.sol";
import "../src/Game.sol";
import "../src/Planet.sol";

import "../src/ressource/metal.sol";
import "../src/ressource/food.sol";
import "../src/ressource/crystal.sol";

contract GameTest is Test {
    Metal public metal;
    Food public food;
    Crystal public crystal;

    Planet public planet;

    Game public game;
    let ONE_PER_MINUTE = 16660000000000000;


    function setUp() public {
        planet = new Planet();
        game = new Game(address(planet));
    
        planet.grantRole(planet.MINTER_ROLE(), address(game));

        /* Add Ressources */
        metal = new Metal();
        metal.grantRole(metal.MINTER_ROLE(), address(game));
        game.registerRessource(0, address(metal), ONE_PER_MINUTE, 90);

        food = new Food();
        food.grantRole(food.MINTER_ROLE(), address(game));
        game.registerRessource(1, address(food), ONE_PER_MINUTE, 70);

        crystal = new Crystal();
        crystal.grantRole(crystal.MINTER_ROLE(), address(game));
        game.registerRessource(2, address(crystal), ONE_PER_MINUTE, 80);

        game.newPlanet(0);
    }

    function testRegisterNewPlanet() public {
        uint256 NEW_PLANET_ID = 88;
        
        emit log("lolol");
        assertEq(game.getBalance(NEW_PLANET_ID, 0), 0);
        assertEq(game.getBalance(NEW_PLANET_ID, 1), 0);
        assertEq(game.getBalance(NEW_PLANET_ID, 2), 0);

        game.newPlanet(NEW_PLANET_ID);

        //assertGt(game.getBalance(NEW_PLANET_ID, 0), 0);
        //assertGt(game.getBalance(NEW_PLANET_ID, 1), 0);
        //assertGt(game.getBalance(NEW_PLANET_ID, 2), 0);

        assertEq(planet.ownerOf(NEW_PLANET_ID), address(this));
    }
}
