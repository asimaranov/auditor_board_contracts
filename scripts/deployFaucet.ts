import { parseEther } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const SBT_ADDRESS = '0x45782146489271c135969c9d58fe5c73d3445808';

  const faucet = await ethers.deployContract("Faucet", [
    parseEther('0.093'),
    SBT_ADDRESS
  ]);

  await faucet.waitForDeployment();

  console.log(
    `Faucet deployed to ${faucet.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
