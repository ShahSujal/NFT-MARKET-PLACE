import React, { useState, useEffect, useContext } from "react";

// Next Image & Link
import Link from "next/link";
import Image from "next/image";

// Contract Access With Help Of Ethers
import { Contract } from "ethers";

// Importing Context
import { NftContext } from "../../context/Context";

// Deployed Artifacts Json
import NFT_MARKET from "../../NFTMarket.json";

// Styling
import Style from "../style/Profile.module.css";

// Heart Icon
import { RiHeart3Fill } from "react-icons/ri";

// Ethers destructured error
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";



const TrendingPurchaseCart = ({ item }) => {

  //  Deployed Market Address
  const NFT_MARKET_ADDRESS = process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS;

  // Creating Context Variable to Access Context
  const context = useContext(NftContext);

  // Destructuring context data
  const { ContextSigner, UserWishList, UserTransaction } = context;

  const nftMarket = new Contract(
    NFT_MARKET_ADDRESS,
    NFT_MARKET.abi,
    ContextSigner
  );

  // States Data
  const [nftData, setNftData] = useState();
  const [nftImage, setNftImage] = useState(undefined);

  // UseEffect for TokenURI to get Data
  useEffect(() => {
    return async () => {
      let TokenUrl = item.tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const res = await fetch(TokenUrl, { method: "GET" });
      const data = await res.json();
      const imageUrl = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
      setNftData(data);
      setNftImage(imageUrl);
    };
  }, [item]);

  //  NFT Structure
  const NFT = {
    id: String,
    owner: String,
    price: String,
    tokenURI: String,
  };

  // Buy Nft Function
  const buyNft = async (nft: NFT) => {
    try {
      // NFT market Buy Function Call
      const transaction = await nftMarket.buyNFT(nft.id, {
        value: nft.price,
      });
      await transaction.wait();

      // Context DataBase Add Nft-Transaction
      await UserTransaction(transaction, nftData.company, "BUY", item.tokenURI);

    } catch (error) {
      getParsedEthersError(error);
    }
  };
  return (
    <div className={Style.TrendingNft}>

      {/* Redirect to single NFT  */}
      <Link href={`/NFT/${item.id}`}>
        <div className={Style.row}>
          {nftData != undefined ? (
            // NFT IMAGE
            <Image
              src={nftImage}
              className={Style.image}
              alt={"no image found"}
              width={480}
              height={480}
              priority={true}
            />
          ) : (
            <>
              <h4>Loading..</h4>
            </>
          )}
           {/* NFT Name */}
          <h2>
           {nftData != undefined && nftData.name ? nftData.name : "Unkown"}
          </h2>
        </div>
      </Link>

      {/* Heart Icon WishList Function */}
      {/* <RiHeart3Fill
        size={19}
        color="#fff"
        style={{ position: "absolute", right: "5%", top: "75%" }}
        onClick={() => UserWishList(item, nftData.company)}
      />
      */}
     {/* Company Name */}
      <p>{nftData != undefined && nftData.company ? nftData.company : "Nft"}</p>

      {/* Purchase Function */}
      <h3
        onClick={() => {
          buyNft(item);
        }}
        className={Style.buyButton}
      >
        Buy NFT NOW
      </h3>
    </div>
  );
};

export default TrendingPurchaseCart;
