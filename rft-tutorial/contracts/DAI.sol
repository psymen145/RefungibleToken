pragma solidity ^0.7.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract DAI is ERC20 {
    constructor() ERC20('DAI Stablecoin', 'DAI') {
    }

    function mint(address to, uint amount) external {
        _mint(to, amount);
    }

    function version() external returns (uint ver) {
        return 1;
    }
} 