// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = require("hardhat");


let Game;
let Planet;

let R1;
let R2;
let R3;

let ONE_PER_MINUTE = 16660000000000000

let ONE_ETHER = 1000000000000000000n;

let R1_PER_SEC = ONE_ETHER * 30n / 60n / 60n
let R2_PER_SEC = ONE_ETHER * 20n / 60n / 60n
let R3_PER_SEC = ONE_ETHER * 10n / 60n / 60n

let R1_START = ONE_ETHER * 10000n
let R2_START = ONE_ETHER * 10000n
let R3_START = ONE_ETHER * 0n

let START_TIME = 2000000000;

let FIRST_PLANET = 1
let SECOND_PLANET = 2

async function main() {

  try {



    const BaseERC20RessourceContract = await ethers.getContractFactory("BaseERC20Ressource")
    R1 = await BaseERC20RessourceContract.deploy("Resource1", "R1")
    await R1.deployed()
    R2 = await BaseERC20RessourceContract.deploy("Resource2", "R2")
    await R2.deployed()

    R3 = await BaseERC20RessourceContract.deploy("Resource3", "R3")
    await R3.deployed()



    const PlanetContract = await ethers.getContractFactory("Planet");
    Planet = await PlanetContract.deploy()
    await Planet.deployed()

    const NameUtilsContract = await ethers.getContractFactory("NameUtils");
    NameUtils = await NameUtilsContract.deploy();
    await NameUtils.deployed()

    const MapUtilsContract = await ethers.getContractFactory("MapUtils");
    MapUtils = await MapUtilsContract.deploy();
    await MapUtils.deployed()

    const GameContract = await ethers.getContractFactory("Game");
    Game = await GameContract.deploy(Planet.address, MapUtils.address, NameUtils.address);
    await Game.deployed()



    const MINTER_ROLE = await Planet.MINTER_ROLE();

    await Planet.grantRole(MINTER_ROLE, Game.address);

    await R1.grantRole(MINTER_ROLE, Game.address);
    await R2.grantRole(MINTER_ROLE, Game.address);
    await R3.grantRole(MINTER_ROLE, Game.address);

    console.log("Planet:", Planet.address)
    console.log("Game:", Game.address)

    await Game.registerRessource(0, R1.address, R1_PER_SEC.toString(), 30, R1_START.toString())
    await Game.registerRessource(1, R1.address, R2_PER_SEC.toString(), 30, R2_START.toString())
    await Game.registerRessource(2, R1.address, R3_PER_SEC.toString(), 30, R3_START.toString())

    await Game.newPlanet(0, 0, 0);
    await Game.newPlanet(1, 1, 1);
  } catch (error) {
    console.log(error)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
