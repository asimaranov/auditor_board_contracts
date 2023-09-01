import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("AuditorContactsStore tests", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ContactsStore = await ethers.getContractFactory("AuditorContactsStore");
    const contactsStore = await ContactsStore.deploy();

    return { contactsStore, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Contacts storing and fetching", async () => {
      const { contactsStore, owner } = await loadFixture(deployFixture);

      await contactsStore.setContacts(
        [
          ethers.encodeBytes32String("telegram"),
          ethers.encodeBytes32String("twitter"),
          ethers.encodeBytes32String("github")
        ],
        [
          ethers.encodeBytes32String("asimaranov"),
          ethers.encodeBytes32String("asimaranov_twitter"),
          ethers.encodeBytes32String("asimaranov_github")
        ]);

      expect(await contactsStore.getContacts(
        owner,
        [
          ethers.encodeBytes32String("github"),
          ethers.encodeBytes32String("twitter"),
          ethers.encodeBytes32String("telegram")
        ])
      ).to.deep.equal(
        [
          ethers.encodeBytes32String("asimaranov_github"),
          ethers.encodeBytes32String("asimaranov_twitter"),
          ethers.encodeBytes32String("asimaranov")
        ]
      );

      expect(await contactsStore.getContacts(
        owner,
        [
          ethers.encodeBytes32String("twitter"),
          ethers.encodeBytes32String("github"),
          ethers.encodeBytes32String("telegram")
        ])
      ).to.not.deep.equal(
        [
          ethers.encodeBytes32String("asimaranov_github"),
          ethers.encodeBytes32String("asimaranov_twitter"),
          ethers.encodeBytes32String("asimaranov")
        ]
      );

      expect(await contactsStore.getContacts(
        owner,
        [
          ethers.encodeBytes32String("github"),
          ethers.encodeBytes32String("twitter"),
          ethers.encodeBytes32String("telegram")
        ])
      ).to.deep.equal(
        [
          ethers.encodeBytes32String("asimaranov_github"),
          ethers.encodeBytes32String("asimaranov_twitter"),
          ethers.encodeBytes32String("asimaranov")
        ]
      );
    });

    it("Length of input arrays should be the same", async () => {
      const { contactsStore, owner } = await loadFixture(deployFixture);

      await expect(
        contactsStore.setContacts(
          [
            ethers.encodeBytes32String("telegram"),
          ],
          [
            ethers.encodeBytes32String("asimaranov"),
            ethers.encodeBytes32String("asimaranov_twitter"),
          ]
        )).to.be.revertedWith("Incorrect argument array length");
    });

    it("Contacts decoding", async () => {
      const { contactsStore, owner } = await loadFixture(deployFixture);

      await contactsStore.setContacts(
        [
          ethers.encodeBytes32String("telegram"),
        ],
        [
          ethers.encodeBytes32String("asimaranov"),
        ]
      );

      expect(ethers.decodeBytes32String(
        (
          await contactsStore.getContacts(
            owner,
            [
              ethers.encodeBytes32String("telegram")
            ]
          )
        )[0]
      )
      ).to.equal(
        "asimaranov"
      );
    });

    it("Empty contact fetching", async () => {
      const { contactsStore, owner } = await loadFixture(deployFixture);

      expect(ethers.decodeBytes32String(
        (
          await contactsStore.getContacts(
            owner,
            [
              ethers.encodeBytes32String("telegram")
            ]
          )
        )[0]
      )
      ).to.equal(
        ""
      );
    });

  });
});
