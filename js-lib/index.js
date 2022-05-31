let GameArtifact = require('../artifacts/contracts/Game.sol/Game.json')
let PlanetArtifact = require('../artifacts/contracts/Planet.sol/Planet.json')

const ethers = require('ethers')
const GameABI = GameArtifact.abi;
const PlanetABI = PlanetArtifact.abi;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function GameLib(provider, addresses) {
    this.ethers = ethers;
    this.addresses = addresses
    console.log("Game Lib initialized", ethers, addresses)
    this.GameContract = (new ethers.Contract(this.addresses.game, GameABI, provider));
    this.PlanetContract = (new ethers.Contract(this.addresses.planet, PlanetABI, provider))
    this.getGameConfig()
}

GameLib.prototype.getPlayerPlanets = async function () {

}

GameLib.prototype.searchArea = async function (xStart, yStart, xEnd, yEnd, callBack) {
    for (let xindex = xStart; xindex <= xEnd; xindex++) {
        for (let yindex = yStart; yindex < yEnd; yindex++) {
            let result = await this.searchForPlanet(xindex, yindex);
            callBack(xindex, yindex, result)
        }
    }
}

GameLib.prototype.searchForPlanet = async function (x, y) {
    let size = 1;
    while (size <= this.MAX_PLANET_SIZE) {
        let res = await this.isValidPlanet(x, y, size);
        if (res) {
            return size
        }
        size++;
    }
    return -1;
}

GameLib.prototype.getPlanetID = function (x, y) {
    let encodedData = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [x, y]);
    let encodedHash = ethers.utils.keccak256(encodedData)
    let encodedHashNumber = ethers.BigNumber.from(encodedHash);
    return(encodedHashNumber.toString())
}

GameLib.prototype.isValidPlanet = async function (x, y, size) {
    await sleep(1)
    let encodedData = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256", "uint256", "uint256"], [this.UNIVERSE, x, y, size]);
    let encodedHash = ethers.utils.keccak256(encodedData)
    let encodedHashNumber = ethers.BigNumber.from(encodedHash);
    let isValid = encodedHashNumber.mod(this.DIFFICULTY).toNumber()
    if (isValid == 0) {
        return true;
    }
    return false;
}

GameLib.prototype.getGameConfig = async function () {
    this.UNIVERSE = (await this.GameContract.UNIVERSE()).toNumber()
    this.DIFFICULTY = (await this.GameContract.DIFFICULTY()).toNumber()
    this.MAX_PLANET_SIZE = (await this.GameContract.MAX_PLANET_SIZE()).toNumber()
}

GameLib.prototype.registerPlanet = async function(x, y, size) {
    let tx = await this.GameContract.newPlanet(x, y, size);
}

module.exports = GameLib;
