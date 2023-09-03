import { ethers } from "hardhat";

async function main() {
  const contactsStore = await ethers.deployContract("AuditorContactsStore", []);

  await contactsStore.waitForDeployment();

  console.log(
    `Contacts store deployed to ${contactsStore.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
