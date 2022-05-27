let GameArtifact = require('../artifacts/contracts/Game.sol/Game.json')
let PlanetArtifact = require('../artifacts/contracts/Planet.sol/Planet.json')

const ethers = require('ethers')
const GameABI = GameArtifact.abi;
const PlanetABI = PlanetArtifact.abi;

console.log(GameABI)
function GameLib(provider, addresses) {
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

GameLib.prototype.isValidPlanet = async function (x, y, size) {
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
    console.log("get game config")
    this.UNIVERSE = (await this.GameContract.UNIVERSE()).toNumber()
    this.DIFFICULTY = (await this.GameContract.DIFFICULTYd()).toNumber()
    this.MAX_PLANET_SIZE = (await this.GameContract.MAX_PLANET_SIZEb()).toNumber()
    console.log(this.DIFFICULTY)
    this.searchArea(0, 0, 10, 10, function (x, y, size) {
        if (size == -1) {
            console.log(x, y, "no planet found")
        } else {
            console.log(x, y, "planet found of size", size)
        }
    })
}

module.exports = GameLib;
