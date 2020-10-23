const { time } = require('@openzeppelin/test-helpers');
const RFT = artifacts.require('RFT.sol');
const NFT = artifacts.require('NFT.sol');
const DAI = artifacts.require('DAI.sol');

const DAI_AMOUNT = web3.utils.toWei('25000');
const SHARE_AMOUNT = web3.utils.toWei('25000');

contract('RFT', async addresses => {
    const [admin, buyer1, buyer2, buyer3, buyer4, _] = addresses;

    it('ICO should work', async () => {
        const dai = await DAI.new();
        const nft = await NFT.new('My awesome NFT', 'NFT');
        await nft.mint(admin, 1);
        await Promise.all([
            dai.mint(buyer1, DAI_AMOUNT),
            dai.mint(buyer2, DAI_AMOUNT),
            dai.mint(buyer3, DAI_AMOUNT),
            dai.mint(buyer4, DAI_AMOUNT),
        ]);

        const rft = await RFT.new(
            'My awesome RFT',
            'RFT',
            nft.address,
            1,
            1,
            web3.utils.toWei('100000'),
            dai.address
        );
        // approve smart contract to spend your tokens
        await nft.approve(rft.address, 1);
        await rft.startIco();

        // need to invest into ico
        await dai.approve(rft.address, DAI_AMOUNT, {from: buyer1});
        await rft.buyShare(SHARE_AMOUNT, {from: buyer1});

        await dai.approve(rft.address, DAI_AMOUNT, {from: buyer2});
        await rft.buyShare(SHARE_AMOUNT, {from: buyer2});

        await dai.approve(rft.address, DAI_AMOUNT, {from: buyer3});
        await rft.buyShare(SHARE_AMOUNT, {from: buyer3});
 
        await dai.approve(rft.address, DAI_AMOUNT, {from: buyer4});
        await rft.buyShare(SHARE_AMOUNT, {from: buyer4}); 

        // openzeppelin can manipulate time in our development blockchain
        // one week plus one sec to end the ico
        await time.increase(7 * 86400 + 1);
        await rft.withdrawProfits();

        const balanceShareBuyer1 = await rft.balanceOf(buyer1);
        const balanceShareBuyer2 = await rft.balanceOf(buyer2);
        const balanceShareBuyer3 = await rft.balanceOf(buyer3);
        const balanceShareBuyer4 = await rft.balanceOf(buyer4);

        // gwei amount too big for javascript to manipualate so we use string
        assert(balanceShareBuyer1.toString() === SHARE_AMOUNT);
        assert(balanceShareBuyer2.toString() === SHARE_AMOUNT);
        assert(balanceShareBuyer3.toString() === SHARE_AMOUNT);
        assert(balanceShareBuyer4.toString() === SHARE_AMOUNT);

        const balanceAdminDai = await dai.balanceOf(admin);
        assert(balanceAdminDai.toString() === web3.utils.toWei('100000'), 'Balance of dai not total dai minted ' + balanceAdminDai.toString());
    });
})