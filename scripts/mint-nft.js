require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/OsunRiverNFT.sol/TorNFT.json");
const contractAddress = "0x38b6398a53fdD38BCbC53b62eBA8f3380c6224D3";
const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function mintNFT(tokenURI) {
    const signPromise = alchemyWeb3.eth.accounts.signTransaction(
        tx,
        PRIVATE_KEY
      );
      signPromise
        .then((signedTx) => {
          alchemyWeb3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
              if (!err) {
                console.log(
                  "The hash of our transaction is: ",
                  hash,
                  "\nCheck Alchemy's Mempool to view the status of our transaction!"
                );
              } else {
                console.log(
                  "Something went wrong when submitting our transaction:",
                  err
                );
              }
            }
          );
        })
        .catch((err) => {
          console.log(" Promise failed:", err);
        });

        mintNFT("https://ipfs.io/ipfs/QmPVEfi2EmT33cWNmUAKBHTogAD7MVqMXjJm4ik6PAoqpb") // pass the CID to the JSON file uploaded to Pinata


    // get the nonce - nonce is needed for security reasons. It keeps track of the number of
    // transactions sent from our address and prevents replay attacks.
  const nonce = await alchemyWeb3.eth.getTransactionCount(PUBLIC_KEY, 'latest');
  const tx = {
    from: PUBLIC_KEY, // our MetaMask public key
    to: contractAddress, // the smart contract address we want to interact with
    nonce: nonce, // nonce with the no of transactions from our account
    gas: 1000000, // fee estimate to complete the transaction
    data: nftContract.methods
      .createNFT("0x38b6398a53fdD38BCbC53b62eBA8f3380c6224D3", tokenURI)
      .encodeABI(), // call the createNFT function from our OsunRiverNFT.sol file and pass the account that should receive the minted NFT.
  }
} 