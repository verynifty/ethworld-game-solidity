let GameArtifact = require('../artifacts/contracts/Game.sol/Game.json')
let PlanetArtifact = require('../artifacts/contracts/Planet.sol/Planet.json')
let MapUtilsArtifact = require('../artifacts/contracts/MapUtils.sol/MapUtils.json')

const ethers = require('ethers')
const GameABI = GameArtifact.abi;
const PlanetABI = PlanetArtifact.abi;
const MapUtilsABI = MapUtilsArtifact.abi

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function GameLib(provider, addresses) {
    this.ethers = ethers;
    this.addresses = addresses
    this.provider = provider
    console.log("Game Lib initialized", ethers, addresses)
    this.GameContract = (new ethers.Contract(this.addresses.game, GameABI, provider.getSigner()));
    this.PlanetContract = (new ethers.Contract(this.addresses.planet, PlanetABI, provider.getSigner()))
    this.getGameConfig()
}

GameLib.prototype.getPlayerPlanets = async function () {

}

GameLib.prototype.getPlanetInfos = async function(id) {
    // console.log("INFOS FROM", id)
    let infos = await this.GameContract.getPlanetInfos(id);
    return infos;
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

GameLib.prototype.getPlanetIDFromContract = async function (x, y) {
    let res = await this.MapUtilsContract.getPlanetId(x, y)
    //console.log(res.toString())
    return (res)
}

GameLib.prototype.getPlanetID = async function (x, y) {
    let encodedData = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [x, y]);
    //console.log(encodedData)
    encodedData = ethers.utils.arrayify(encodedData)
    let encodedHash = ethers.utils.sha256(encodedData)
    let encodedHashNumber = ethers.BigNumber.from(encodedHash);
    //console.log(x, y, encodedHashNumber.toString())
    await this.getPlanetIDFromContract(x, y)
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
    this.MapUtilsContract = (new ethers.Contract((await this.GameContract.mapUtils()), MapUtilsABI, this.provider.getSigner()))

}

GameLib.prototype.registerPlanet = async function(x, y, size) {
    let tx = await this.GameContract.newPlanet(x, y, size);
}

GameLib.prototype.upgradeRessource = async function(planet, ressource) {
    let tx = await this.GameContract.upgradeRessource(planet, ressource);
}

GameLib.prototype.getUpgradeCost = async function(ressource, level) {
    let res = await this.GameContract.getUpgradeCost(ressource, level);
    return res;
}

GameLib.prototype.getUpgradeStorageCost = async function(ressource, level) {
    let res = await this.GameContract.getUpgradeStorageCost(ressource, level);
    return res;
}

GameLib.prototype.upgradeStorage = async function(planet, ressource) {
    let tx = await this.GameContract.upgradeStorage(planet, ressource);
}

module.exports = GameLib;
