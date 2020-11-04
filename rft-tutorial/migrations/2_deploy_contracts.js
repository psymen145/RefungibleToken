const DAI = artifacts.require("DAI");
const NFT = artifacts.require("NFT");
const RFT = artifacts.require("RFT");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(DAI);
  const dai = await DAI.deployed();

  await deployer.deploy(NFT, "Simon NFT", "SNFT");
  const nft = await NFT.deployed();

  await deployer.deploy(RFT, "Simon's RFT", "SRFT", nft.address, 1, 1, 1000, dai.address);
  const rft = await RFT.deployed();
}