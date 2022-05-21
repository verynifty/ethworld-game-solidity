const { expect } = require("chai");
const { ethers } = require("hardhat");


let Game;
let Planet;

let R1;
let R2;
let R3;

beforeEach(function () {
  console.log("Deploying everything")

  const GameContract = await ethers.getContractFactory("Game");
  Game = await GameContract.deploy("Hello, world!");

  console.log(Game)
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
