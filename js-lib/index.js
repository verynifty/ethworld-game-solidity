let GameArtifact = require('../artifacts/contracts/Game.sol/Game.json')
const ethers = require('ethers')
const GameABI = GameArtifact.abi;

console.log(GameABI)
function GameLib (provider, addresses) {
    this.ethers = ethers;
    this.addresses = addresses
    console.log("Game Lib initialized", ethers, addresses)
    this.GameContract = (new ethers.Contract(this.addresses.game, GameABI)).connect(provider);
    console.log("get config")
    this.getGameConfig()
}
  
GameLib.prototype.countPlanets = async function () {
    
}

GameLib.prototype.getGameConfig = async function () {
    console.log("get game config")
    let a = await this.GameContract.UNIVERSE()
    console.log(a)
}

module.exports = GameLib;
