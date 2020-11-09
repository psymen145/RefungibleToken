import React from 'react';
import Web3 from 'web3';
import DaiABI from '../abis/DAI.json';

class TokenList extends React.Component {
  state = {
    account: null,
    daiToken: null,
    daiBalance: null,
    daiTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'
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

    const networkId = await web3.eth.net.getId();

    const daiToken = new web3.eth.Contract(DaiABI, this.state.daiTokenAddress);
    let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call();
    console.log(daiTokenBalance);
  }

  render() {
    return (
      <div>
        <h4>TokenList</h4>
        <div>
          Connected account: {this.state.account} 
        </div>
        <div>
          Dai Balance: 
        </div>
      </div>
    );
  }
}

export default TokenList;