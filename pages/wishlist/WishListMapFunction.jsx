import React,{ useState, useEffect }  from "react";

// Next Link & Image 
import Link from "next/link";
import Image from "next/image";

// Styling
import Style from "../style/WishList.module.css";


const WishListMapFunction = ({ item }) => {
  
  // Log Item data
  // console.log(item);

  // States
  const [nftData, setNftData] = useState();
  const [nftImage, setNftImage] = useState(undefined);

  // UseEffect Fect TokenUri Data
  useEffect(() => {
    return async () => {
      console.log(item[0]);
      let TokenUrl = item.tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const res = await fetch(TokenUrl, { method: "GET" });
      const data = await res.json();
      const imageUrl = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
      setNftData(data);
      setNftImage(imageUrl);
    };
  }, [item]);


  return (
    // Main Container
    <div className={Style.content}>

      {/* Image Of Nft */}
      {/* State != undefined */}
      {nftImage != undefined ? (
        <Image
          src={nftImage}
          className={Style.contentImage}
          width={360}
          height={360}
          alt="Loading"
          priority={true}
        />
      ) : (
        // If State Undefined Loading
        <Image
          src={require(`../../public/loading.gif`)}
          className={Style.contentImage}
          width={360}
          height={360}
          alt="Loading"
          priority={true}
        />
      )}

      {/* Nft Name */}
      <Link href={`/NFT/`}>
        <h1 className={Style.contentTitle}>{nftData ? nftData.name : "Nft"}</h1>
      </Link>

     {/* Nft Company Name */}
      <p>{nftData ? nftData.company : "Company"}</p>

      {/*   CheckOut */}
      <Link href={`/NFT/${item.id}`}>
        <button className={Style.purchase}>CheckOut </button>
      </Link>
      
    </div>
  );
};

export default WishListMapFunction;
