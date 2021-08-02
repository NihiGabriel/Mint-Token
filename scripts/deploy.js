async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  const MIT = await ethers.getContractFactory("MitNFT");

  // Start deployment, returning a promise that resolves to a contract object
  const mit = await MIT.deploy();
  console.log("Contract deployed to address:", mit.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });