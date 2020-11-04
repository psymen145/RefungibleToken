import React from 'react';
import Web3 from 'web3';
import { Router, Route, Redirect } from 'react-router-dom';
import { MDBContainer } from 'mdbreact';
import history from '../history';
import Header from './Header';
import TokenList from './TokenList';

class App extends React.Component {
  state = {
    //rpcURL: "https://rinkeby.infura.io/v3/cdc97f2e6a45480095ba00a6c97b3e2b",
    rpcURL: "http://localhost:7545",
    account: "0x8B4C720882e3Ad63D5070efbcdfec656314f9046" 
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /* 
    // check network type
    web3.eth.net.getNetworkType().then(console.log);

    web3.eth.getBlockNumber().then(console.log);

    web3.eth.getBalance(this.state.account, (err, wei) => {
      let balance = web3.utils.fromWei(wei, 'ether');
      console.log(balance);
    })
    */
  }

  render() {
    return (
      <MDBContainer>
        <Router history={history}>
          <Header />
          <Route path="/" exact component={TokenList} />
        </Router>
      </MDBContainer>
    );
  }
}

export default App;
