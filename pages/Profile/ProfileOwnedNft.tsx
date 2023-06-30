import React, { useContext, useEffect, useState } from "react";

// Next Image & Link
import Link from "next/link";
import Image from "next/image";

// Styling
import Style from "../style/Profile.module.css";

// Transaction Response on list
import { TransactionResponse } from "@ethersproject/abstract-provider";

// Ethers deployed contract access
import { Contract, ethers, BigNumber } from "ethers";

// Context
import { NftContext } from "../../context/Context";

// Market json
import NFT_MARKET from "../../NFTMarket.json";

// Main Function
const ProfileOwnedNft = ({ item }) => {

  // Storing Context
  const Context = useContext(NftContext);

  // NFT Price
  const pricing = "0.000000000000000001";

  // Destructure data 
  const { ContextSigner, UserTransaction } = Context;

  // Deployed Market Address
  const NFT_MARKET_ADDRESS = process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS;

  // Fetching Contract to perform operations
  const nftMarket = new Contract(
    NFT_MARKET_ADDRESS,
    NFT_MARKET.abi,
    ContextSigner
  );
  // console.log("market = ",nftMarket);
  

  // List Function
  const listNFT = async (tokenID: String, price: BigNumber) => {
    const wei = ethers.utils.parseEther(price);
    const transaction: TransactionResponse = await nftMarket.listNFT(
      tokenID,
      wei.toString()
    );
    await transaction.wait();

    // Wait & Add to DataBase
    await UserTransaction(
      transaction,
      nftData.company,
      "LISTED",
      item.tokenURI
    );
  };

  // Sell Confirmed
  const onSellConfirmed = async (tokenId: string, price: BigNumber) => {
    try {
      await listNFT(tokenId, price);
    } catch (e) {
      console.log(e);
    }
  };

  // States
  const [nftData, setNftData] = useState();
  const [nftImage, setNftImage] = useState(undefined);

  // UseEffect 
  useEffect(() => {
    return async () => {
      let TokenUrl = item.tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const res = await fetch(TokenUrl, { method: "GET" });
      const data = await res.json();
      const imageUrl = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");

      // set State Data
      setNftData(data);
      setNftImage(imageUrl);
    };
  }, [item]);

  return (
    <div className={Style.content}>
      <Link href={`/NFT/${item.id}`}>
        <div className={Style.row}>

          {/* NFT image */}
          {nftData != undefined ? (
            <Image
              src={nftImage}
              className={Style.image}
              alt={"no image found"}
              width={480}
              height={480}
            />
          ) : (
            <Image
              src={require("../../public/loading.gif")}
              className={Style.image}
              width={480}
              height={480}
              alt="no image"
            />
          )}

          {/* Nft Name */}
          <h2>
            {nftData != undefined && nftData.name ? nftData.name : "Unkown"}
          </h2>

        </div>
      </Link>

      {/* Sell or List Nft Function */}
      <p
        onClick={() => {
          onSellConfirmed(item.id, pricing);
        }}
      >
        SELL NFT NOW
      </p>
    </div>
  );
};

export default ProfileOwnedNft;
