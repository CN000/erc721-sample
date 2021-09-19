require('@nomiclabs/hardhat-waffle');
require('hardhat-abi-exporter');
require('solidity-coverage');

//https://hardhat.org/config/

const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic         = process.env.DEPLOYER_PRIVATE_KEY;
const providerRopsten  = process.env.PROVIDER_ROPSTEN;

/**
 * @type import('hardhat/config').HardhatUserConfig
 *  Reference By
 *  https://www.trufflesuite.com/docs/truffle/reference/configuration
 */
module.exports = {
  compilers: {
      solc: {
          version: "0.8.6"
      }
  },
  solidity: '0.8.6',

  networks: {
      hardhat: {
          initialBaseFeePerGas: 0 // hardhat london fork error fix for coverage
      },
      // development: {
      //     host: "127.0.0.1",
      //     port: 8545,
      //     network_id: "*" // Match any network id
      // },

    ropsten: {
        url:"https://ropsten.infura.io/v3/9347b67d1f8c4c8989873698bb1f57ed",
        provider: function() {
            return new HDWalletProvider(mnemonic,providerRopsten);
        },
        network_id: 3,
        from: process.env.DEPLOYER_ACCOUNT,
        // gasPrice: Number(process.env.GAS_PRICE),
        // gas: 8000000,
        // timeoutBlocks: 200,
        // confirmations: 2,
        // skipDryRun: true
    }
  },
  paths: {
    sources: './src/*',
    artifacts: './build',
    tests: './src/tests/*'
  },
  abiExporter: {
    path: './data/abi',
    clear: true,
    flat: true,
  }
};
