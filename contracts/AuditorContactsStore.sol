// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/// @title Contract to store Stronghold DAO auditor social contacts
/// @author asimaranov
/// @notice Allows auditors to link their social networks to the auditor's board
contract AuditorContactsStore {
    mapping(address => mapping(bytes32 => bytes32)) contacts;  // Auditor => social network name => username

    event ContactsSet(address indexed auditor, bytes32[] socialNetwork, bytes32[] contact);

    /// @notice Sets auditor contacts
    /// @param socialNetworks Social network names converted to bytes32
    /// @param contacts_ Corresponding contact usernames converted to bytes32 without website prefix
    function setContacts(bytes32[] calldata socialNetworks, bytes32[] calldata contacts_) public {
        require(socialNetworks.length == contacts_.length, "Incorrect argument array length");
        
        for (uint256 i = 0; i < contacts_.length; i++) {
            contacts[msg.sender][socialNetworks[i]] = contacts_[i];
        }

        emit ContactsSet(msg.sender, socialNetworks, contacts_);
    }

    /// @notice Returns saved auditor contacts
    /// @param auditor Auditor to request contacts for
    /// @param socialNetworks Social network names converted to bytes32 to get correspoinding contacts
    /// @return contacts_ Contacts for the requested social networks
    function getContacts(address auditor, bytes32[] calldata socialNetworks) public view returns (bytes32[] memory contacts_) {
        contacts_ = new bytes32[](socialNetworks.length);
        for (uint256 i = 0; i < socialNetworks.length; i++) {
            contacts_[i] = contacts[auditor][socialNetworks[i]];
        }
    }
}
