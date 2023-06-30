import React,{useContext,useState} from 'react'
import Style from '../style/Product.module.css'
import { Contract } from "ethers";

// Importing Context
import { NftContext } from "../../context/Context";

import { getParsedEthersError } from '@enzoferey/ethers-error-parser';
// Deployed Artifacts Json
import NFT_MARKET from "../../NFTMarket.json";

const BuyFunction = ({item,nftData}) => {
    // const [nftData, setNftData] = useState();
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

    // Buy Nft Function
  const buyNft = async (nft: NFT) => {
    console.log("BUY FUNCTION CALL", nft);
    let price = '0.0000000000001'
    console.log(nft.price);
    
    try {
      // NFT market Buy Function Call
      const transaction = await nftMarket.buyNFT(nft.id, {
        value: nft.price,
      });
      await transaction.wait();
      console.log("Transaction :", transaction);
      

      // Context DataBase Add Nft-Transaction
      // await UserTransaction(transaction, nftData.company, "BUY", item.tokenURI);

    } catch (error) {
      console.log(error);
      
      getParsedEthersError(error);
    }
  };
  return (
    <div>
      <button className={Style.buyButton} onClick={()=>buyNft(item[0])}>Buy Now</button>
    </div>
  )
}

export default BuyFunction
