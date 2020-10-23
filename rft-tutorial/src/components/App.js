import React from 'react';
import Web3 from 'web3';

class App extends React.Component {
  state = {
    rpcURL: "https://rinkeby.infura.io/v3/cdc97f2e6a45480095ba00a6c97b3e2b"
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("App component mounted");
    const web3 = new Web3(this.state.rpcURL);
    const account = "0xDF2Fb5c954d6c817e1C6e582a7905132302E8aE6";
    web3.eth.getBalance(account, (err, wei) => {
      let balance = web3.utils.fromWei(wei, 'ether');
      console.log(balance);
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Refungible Token ICO</h1>
      </div>
    );
  }
}

export default App;
