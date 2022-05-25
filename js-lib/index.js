function GameLib (ethers, addresses) {
    this.ethers = ethers;
    this.addresses = addresses
    console.log("Game Lib initialized", ethers, addresses)
}
  
GameLib.prototype.countPlanets = async function () {
    
}

module.exports = GameLib;
