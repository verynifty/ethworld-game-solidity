let EWEngineArtifact = require('../artifacts/contracts/EWEngine.sol/EWEngine.json')

const ethers = require('ethers')
const EWEngineABI = EWEngineArtifact.abi;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function GameLib(provider, addresses) {
    this.ethers = ethers;
    this.addresses = addresses
    this.provider = provider
    console.log("Game Lib initialized", ethers, addresses)
    this.Engine = (new ethers.Contract(this.addresses.engine, EWEngineABI, provider.getSigner()));
    //this.getGameConfig()
}

GameLib.prototype.getGames = async function() {
    let nbGames = await this.Engine.nbGames()
    return nbGames.toNumber();
}

GameLib.prototype.getGame = async function(id) {
    let g = await this.Engine.getGame(id)
    return {
        players: g.players,
        nbPlayers: g.players.length,
        height: g.height.toNumber(),
        width: g.width.toNumber(),
        startTime: g.startTime.toNumber()
    }
}



module.exports = GameLib;
