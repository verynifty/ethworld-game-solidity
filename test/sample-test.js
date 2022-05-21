const { expect } = require("chai");
const { ethers } = require("hardhat");


let Game;
let Planet;

let R1;
let R2;
let R3;

let ONE_PER_MINUTE = 16660000000000000

async function setTime(value) {
  await ethers.provider.send("evm_setNextBlockTimestamp", [value]);
  await ethers.provider.send("evm_mine"); 
}

async function passTime(value) {
  await ethers.provider.send("evm_increaseTime", [value]);
  await ethers.provider.send("evm_mine"); 
}

beforeEach(async function () {
  console.log("Deploying everything")

  const BaseERC20RessourceContract = await ethers.getContractFactory("BaseERC20Ressource")
  R1 = await BaseERC20RessourceContract.deploy("Resource1", "R1")
  R2 = await BaseERC20RessourceContract.deploy("Resource2", "R2")
  R3 = await BaseERC20RessourceContract.deploy("Resource3", "R3")


  const PlanetContract = await ethers.getContractFactory("Planet");
  Planet = await PlanetContract.deploy()

  const GameContract = await ethers.getContractFactory("Game");
  console.log(Planet.address)
  Game = await GameContract.deploy(Planet.address);

  const MINTER_ROLE = await Planet.MINTER_ROLE();
  await R1.grantRole(MINTER_ROLE, Game.address);
  await R2.grantRole(MINTER_ROLE, Game.address);
  await R3.grantRole(MINTER_ROLE, Game.address);


  Game.registerRessource(0, R1.address, ONE_PER_MINUTE, 90)
  Game.registerRessource(1, R1.address, ONE_PER_MINUTE, 90)
  Game.registerRessource(2, R1.address, ONE_PER_MINUTE, 90)

  console.log(MINTER_ROLE)

  await setTime(2000000000)
});


describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Game = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
