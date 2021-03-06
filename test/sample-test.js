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

let R1_START = ONE_ETHER * 0n
let R2_START = ONE_ETHER * 200n
let R3_START = ONE_ETHER * 100n

let START_TIME = 2000000000;

let FIRST_PLANET = 1
let SECOND_PLANET = 2

async function setTime(value) {
  await ethers.provider.send("evm_setNextBlockTimestamp", [value]);
  await ethers.provider.send("evm_mine");
}

async function passTime(value) {
  await ethers.provider.send("evm_increaseTime", [value]);
  await ethers.provider.send("evm_mine");
}

function printNumber(n) {
  console.log(ethers.utils.formatEther(n))
}

async function printInfos(_planetId) {
  let infos = await Game.getPlanetInfos(_planetId);
  console.log("=== Planet infos:", _planetId);
  printNumber(infos.r1)
  printNumber(infos.r2)
  printNumber(infos.r3)
}

before(async function () {

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

  console.log(R1_START.toString())
  await Game.registerRessource(0, R1.address, R1_PER_SEC.toString(), 30, R1_START.toString())
  await Game.registerRessource(1, R1.address, R2_PER_SEC.toString(), 30, R2_START.toString())
  await Game.registerRessource(2, R1.address, R3_PER_SEC.toString(), 30, R3_START.toString())

  await Game.newPlanet(FIRST_PLANET);
  await Game.newPlanet(SECOND_PLANET);

  console.log("Planet:", Planet.address)
  console.log("Game:", Game.address)
  
  await setTime(START_TIME)
});


describe("Game", function () {
  it("Can mint a planet", async function () {
    return
    let TEST_ID = 66
    const supplyBefore = await Planet.totalSupply()
    const user = (await ethers.getSigners())[0].address;

    await Game.newPlanet(TEST_ID);
    let owner = await Planet.ownerOf(TEST_ID)

    const supplyAfter = await Planet.totalSupply()

    expect(owner).to.equal(user);
    expect(supplyAfter).to.equal(supplyBefore.toNumber() + 1);
  });

  it("Planet balance is ok idle", async function () {
    
    await printInfos(FIRST_PLANET);


    await passTime(60 * 60)

    await printInfos(FIRST_PLANET);

    let cost = await Game.getUpgradeCost(0, 2)
    console.log("UPGRADE COST")
    printNumber(cost.r1)
    printNumber(cost.r2)
    await Game.upgradeRessource(FIRST_PLANET, 0)
    await printInfos(FIRST_PLANET);


    await passTime(60 * 60)
    await printInfos(FIRST_PLANET);
    console.log("JFJFJFJFJJF")

  });


  it("Check upgrade costs", async function () {
      for (let index = 1; index < 100; index++) {
       // console.log("Level", index)
        let cost = await Game.getUpgradeCost(0, index)
       // printNumber(cost.r1)
       // printNumber(cost.r2)
      }

  });



});
