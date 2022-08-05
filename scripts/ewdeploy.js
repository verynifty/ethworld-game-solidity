// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = require("hardhat");


let Game;
let Planet;

async function main() {

  try {


    const EWEngineContract = await ethers.getContractFactory("EWEngine");
    EWEngine = await EWEngineContract.deploy()
    await EWEngine.deployed()

    const EWMapDuelContract = await ethers.getContractFactory("EWMapDuel");
    EWMapDuel = await EWMapDuelContract.deploy();
    await EWMapDuel.deployed()


    await EWEngine.newMap(EWMapDuel.address);

    await EWEngine.newGame(["0x656c66F1C4be734Bd14163Bbe001d379121478ca", "0x656c66F1C4be734Bd14163Bbe001d379121478ca"], 0)


    console.log("EWEngine:", EWEngine.address)
    console.log("EWMapDuel:", EWMapDuel.address)

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
