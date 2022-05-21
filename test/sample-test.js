const { expect } = require("chai");
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

let R1_START = ONE_ETHER * 300n
let R2_START = ONE_ETHER * 200n
let R3_START = ONE_ETHER * 100n

async function setTime(value) {
  await ethers.provider.send("evm_setNextBlockTimestamp", [value]);
  await ethers.provider.send("evm_mine"); 
}

async function passTime(value) {
  await ethers.provider.send("evm_increaseTime", [value]);
  await ethers.provider.send("evm_mine"); 
}

beforeEach(async function () {

  const BaseERC20RessourceContract = await ethers.getContractFactory("BaseERC20Ressource")
  R1 = await BaseERC20RessourceContract.deploy("Resource1", "R1")
  R2 = await BaseERC20RessourceContract.deploy("Resource2", "R2")
  R3 = await BaseERC20RessourceContract.deploy("Resource3", "R3")


  const PlanetContract = await ethers.getContractFactory("Planet");
  Planet = await PlanetContract.deploy()

  const GameContract = await ethers.getContractFactory("Game");
  Game = await GameContract.deploy(Planet.address);

  const MINTER_ROLE = await Planet.MINTER_ROLE();

  await Planet.grantRole(MINTER_ROLE, Game.address);

  await R1.grantRole(MINTER_ROLE, Game.address);
  await R2.grantRole(MINTER_ROLE, Game.address);
  await R3.grantRole(MINTER_ROLE, Game.address);


  await Game.registerRessource(0, R1.address, R1_PER_SEC.toString(), 30, R1_START)
  await Game.registerRessource(1, R1.address, R2_PER_SEC.toString(), 30, R2_START)
  await Game.registerRessource(2, R1.address, R3_PER_SEC.toString(), 30, R3_START)

  await setTime(2000000000)
});


describe("Game", function () {
  it("Can mint a planet", async function () {
    const supplyBefore = await Planet.totalSupply()
    const user = (await ethers.getSigners())[0].address;
    await Game.newPlanet(1);
    let owner = await Planet.ownerOf(1)
    const supplyAfter = await Planet.totalSupply()

    expect(owner).to.equal(user);
    expect(supplyAfter).to.equal(supplyBefore + 1);
  });

});
