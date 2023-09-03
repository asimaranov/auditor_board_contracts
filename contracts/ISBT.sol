// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/// @title Interface of the Stronghold DAO SelfBound Token
interface ISBT {
    struct TokenData {
        uint256 amount; // token amounts
        uint256 weight; // weight for each token
        string metaData;
        bytes32[] params;
    }

    function getIds() external returns (uint256[] memory);
    function getPendingBalance(uint256 id, address user) external returns (uint);
    function getTokenData(uint256 id, address user) external returns (TokenData memory);
}