import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-abi-exporter";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/jGtKje8PmSzYD1f4DgXoS3FSp_cxbzR7",
      accounts: [process.env.PRIVATE_KEY!]
    }
  },
  abiExporter: [
    {
      path: "./abi",
      format: "json",
      runOnCompile: true,
    },
  ],
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY!,
  }
};

export default config;
