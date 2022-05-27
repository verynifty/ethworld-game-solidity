let GameArtifact = require('../artifacts/contracts/Game.sol/Game.json')
let PlanetArtifact = require('../artifacts/contracts/Planet.sol/Planet.json')

const ethers = require('ethers')
const GameABI = GameArtifact.abi;
const PlanetABI = PlanetArtifact.abi;

console.log(GameABI)
function GameLib (provider, addresses) {
    this.ethers = ethers;
    this.addresses = addresses
    console.log("Game Lib initialized", ethers, addresses)
    this.GameContract = (new ethers.Contract(this.addresses.game, GameABI)).connect(provider);
    this.PlanetContract = (new ethers.Contract(this.addresses.planet, PlanetABI)).connect(provider);

    console.log("get config")
    this.getGameConfig()
}
  
GameLib.prototype.getPlayerPlanets = async function () {
    
}

GameLib.prototype.getGameConfig = async function () {
    console.log("get game config")
    this.UNIVERSE = (await this.GameContract.UNIVERSE()).toNumber()
    this.DIFFICULTY = (await this.GameContract.DIFFICULTY()).toNumber()
    console.log("loaded game params", this.UNIVERSE, this.DIFFICULTY)
}

module.exports = GameLib;
