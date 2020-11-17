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

  await dai.mint(accounts[0], 10000099);
  await dai.mint(accounts[1], 10001);
  await dai.mint(accounts[2], 10002);
  await dai.mint(accounts[3], 10003);
  await dai.mint(accounts[4], 10004);
}