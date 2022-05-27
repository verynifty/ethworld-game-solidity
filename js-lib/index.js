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

GameLib.prototype.searchForPlanet = async function(x, y) {
    let size = 1;
    while (size <= this.MAX_PLANET_SIZE) {
        let res = this.isValidPlanet(x, y, size);
        if (res) {
            return size
        }
        size++;
    }
    return -1;
}

GameLib.prototype.isValidPlanet = async function(x, y, size) {
    let encodedData =  ethers.utils.defaultAbiCoder.encode(["uint256", "uint256", "uint256", "uint256"], [this.UNIVERSE, x, y, size]);
    let encodedHash = ethers.utils.keccak256(encodedData)
    let encodedHashNumber = ethers.BigNumber.from(encodedHash);
    console.log(encodedHashNumber.toString())
    let isValid = encodedHashNumber.mod(this.DIFFICULTY).toNumber()
    console.log(this.DIFFICULTY, isValid)
    if (isValid == 0) {
        return true;
    }
}

GameLib.prototype.getGameConfig = async function () {
    console.log("get game config")
    this.UNIVERSE = (await this.GameContract.UNIVERSE()).toNumber()
    this.DIFFICULTY = (await this.GameContract.DIFFICULTY2()).toNumber()
    this.MAX_PLANET_SIZE = (await this.GameContract.MAX_PLANET_SIZE()).toNumber()
    console.log(this.DIFFICULTY)
    console.log("loaded game params", this.UNIVERSE, this.DIFFICULTY)
    let result = await this.searchForPlanet(1, 1)
    console.log(result)
    result = await this.searchForPlanet(1, 2)
    console.log(result)
    result = await this.searchForPlanet(1, 3)
    console.log(result)
    result = await this.searchForPlanet(1, 4)
    console.log(result)
    result = await this.searchForPlanet(1, 5)
    console.log(result)
}

module.exports = GameLib;
