import React from 'react';
import Web3 from 'web3';
import DaiABI from '../abis/DAI.json';
import RftABI from '../abis/RFT.json';

class TokenList extends React.Component {
  state = {
    account: null,
    daiToken: null,
    daiBalance: 0,
    ethBalance: 0,
    daiVersion: 0,
    validNFT: false,
    nftAddrVal: '',
    icoShareAmount: 0,
    RFTBalance: 0
  }

  constructor(props) {
    super(props);
  }
  
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockChainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non Ethereum-based browser detected');
    }
  }

  async loadBlockChainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    let ethBalance = await web3.eth.getBalance(this.state.account);
    ethBalance = web3.utils.fromWei(ethBalance);
    this.setState({ ethBalance });

    const networkId = await web3.eth.net.getId();
    const daiTokenData = DaiABI.networks[networkId];

    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiABI.abi, daiTokenData.address);
      let daiBalance = await daiToken.methods.balanceOf(this.state.account).call();
      let daiVersion = await daiToken.methods.version().call(); 
      await daiToken.methods.mint(this.state.account, '1000').call();
      this.setState({ daiVersion });
      this.setState({ daiBalance });
    }
  }

  loadRFTDetails = async () => {
    const web3 = window.web3;

    if (this.state.nftAddrVal && web3.utils.isAddress(this.state.nftAddrVal)) {
      this.setState({ validNFT: true });

      const networkId = await web3.eth.net.getId();
      const rftTokenData = RftABI.networks[networkId];

      if (rftTokenData) {
        const rftToken = new web3.eth.Contract(RftABI.abi, rftTokenData.address);
        rftToken.
      }

    } else {
      this.setState({ validNFT: false });
    }
  }

  renderRFTDetails() {
    if(this.state.validNFT) {
      return (
        <>
          <h4>Shares Owned: </h4>
          <div>
            Share Amount:
            <input type="text"
                  name="share-amt"
                  className="form-control"
                  value={this.state.icoShareAmount}
                  onChange={e => {this.setState({ icoShareAmount: e.target.value })}}
                  />
          </div>
          <div>
            <button className="btn btn-primary">Buy ICO</button>
          </div>
        </>
      )
    }
  }

  render() {
    return (
      <div>
        <h4>TokenList</h4>
        <div>
          Connected account: {this.state.account} 
        </div>
        <div>
          Ethereum Balance: {this.state.ethBalance}
        </div>
        <div>
          Dai Balance: {this.state.daiBalance}, Dai Version: {this.state.daiVersion}
        </div>

        <hr/>

        <div>
          NFT Address:
          <input type="text" 
                name="nft-addr"
                className="form-control"
                value={this.state.nftAddrVal}
                onChange={e => {this.setState({ nftAddrVal: e.target.value })}}/>
          <button className="btn btn-primary" onClick={this.loadRFTDetails}>Load Details</button>
        </div>

        <hr/>

        {this.renderRFTDetails()}

      </div>
    );
  }
}

export default TokenList;