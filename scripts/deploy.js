// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = require("hardhat");


async function main() {
 
  let ONE_PER_MINUTE = "16660000000000000";

  const BaseERC20RessourceContract = await ethers.getContractFactory("BaseERC20Ressource")
  console.log("Deplou")
  R1 = await BaseERC20RessourceContract.deploy("Resource1", "R1")
  console.log("Deployed")

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


  await Game.registerRessource(0, R1.address, ONE_PER_MINUTE, 90)
  await Game.registerRessource(1, R1.address, ONE_PER_MINUTE, 90)
  await Game.registerRessource(2, R1.address, ONE_PER_MINUTE, 90)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
