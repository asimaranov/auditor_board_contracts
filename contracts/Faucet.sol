// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ISBT.sol";

/// @title Initial ETH airdrop
/// @author asimaranov
/// @notice Gives Stronghold DAO auditors initial ETH
contract Faucet is Ownable {
    uint256 public ethToGive;
    ISBT public SBT;
    mapping(address => bool) public auditorParticipated; // Auditor => is participated

    /// @param ethToGive_ ETH amount to give to auditors
    /// @param SBTAddress Address of the Stronghold DAO SelfBound Token
    constructor(uint256 ethToGive_, address SBTAddress) payable {
        ethToGive = ethToGive_;
        SBT = ISBT(SBTAddress);
    }

    receive() external payable {}

    /// @notice Changes the ETH amount to give
    /// @param ethToGive_ Amount of ETH to give
    function setEthToGive(uint256 ethToGive_) public onlyOwner {
        ethToGive = ethToGive_;
    }

    /// @notice Allows to take ether back from airdrop
    function sweepEth() public onlyOwner {
        payable(msg.sender).call{value: address(this).balance}("");
    }

    /// @notice Gives test tokens to auditor
    /// @dev SBT has no mechanics to determine whether auditor is registered in SBT so we need check nft balance
    /// @param auditor Auditor to request airdrop for
    /// @param nftId Id of the nft to check user is an auditor
    function requestAirdrop(address auditor, uint256 nftId) public {
        require(!auditorParticipated[auditor], "Already participated");
        require(
            SBT.getPendingBalance(nftId, auditor) > 0 ||
                SBT.getTokenData(nftId, auditor).amount > 0,
            "Not an auditor"
        );

        auditorParticipated[auditor] = true;

        if (ethToGive > 0) {
            (bool sent, bytes memory data) = payable(msg.sender).call{value: ethToGive}("");
            require(sent, "Failed to send ether");
        }
    }
}
