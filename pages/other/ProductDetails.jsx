import React, { useContext, useEffect, useState } from "react";
import Style from "../style/Product.module.css";
import Image from "next/image";
import Company from "../other/Company";
import { NftContext } from "../../context/Context";
import BuyFunction from './BuyFunction'
const ProductDetails = ({ data }) => {
  // console.log("data is",data);
  const context = useContext(NftContext);
  const { CompanyTransaction, CompanyData, ContextAddress, UserWishList } = context;
  const [nftData, setNftData] = useState({
    data:{},
    Image:"",
    Buy:1,
    Sell:1,
  });
  // const [nftImage, setNftImage] = useState(undefined);


  useEffect(() => {
    return async () => {
      let TokenUrl = data[0].tokenURI.replace(
        "ipfs://",
        "https://ipfs.io/ipfs/"
      );
      const res = await fetch(TokenUrl, { method: "GET" });
      const dataAwait = await res.json();
      const imageUrl = dataAwait.image.replace(
        "ipfs://",
        "https://ipfs.io/ipfs/"
      );
      await CompanyTransaction(dataAwait.company);
      // console.log(data[0].to.toLowerCase() == ContextAddress.toLowerCase());
      setNftData({data:dataAwait,Image:imageUrl})
    };
  }, [data]);


  return (
    <>
      <div className={Style.container}>
        <div className={Style.ImageBackGround}>
          {nftData.Image!="" ? (
            <Image
              src={require("../../public/bgProfile4.jpg")}
              className={Style.BgImage}
              alt={"no image found"}
              priority={true}
              width={480}
              height={480}
            />
          ) : (
            <h1>No image</h1>
          )}
        </div>
        <div className={Style.box}>
          <div className={Style.row}>
            <div className={Style.Partition}>
              <div className={Style.image}>
                {nftData.Image != "" ? (
                  <Image
                    src={nftData.Image}
                    className={Style.ProfileImage}
                    alt={"no image found"}
                    width={480}
                    height={480}
                  />
                ) : (
                  <h1>Loading..</h1>
                )}
              </div>
              <div></div>
            </div>
            <div className={Style.Partition}>
              <div>
                <div>
                  <h3
                    className={Style.Name}
                    style={{ fontSize: "42px", borderBottom: "4px solid gray" }}
                  >
                    {nftData.data ? nftData.data.name : "Nft"}
                  </h3>
                </div>
              </div>
              <div className={Style.ViewDesc}>
                <p>
                  The inventors' future chances of receiving royalties from NFTs
                  likewise portend significant ramifications for growth. NFTs
                  open new opportunities for inclusive growth for all
                  participants by integrating content producers from many
                  industries into a single ecosystem. Creators of NFT can
                  communicate with their customers directly and receive the
                  total value for their work. Buyers, on the other hand, have
                  the choice of liquidity in several asset classes thanks to
                  NFTs.
                </p>
              </div>
              <div className={Style.Total}>
                <div className={Style.View}>
                  <h2 className={Style.number}>{CompanyData? CompanyData.length:1}</h2>
                  <h3 className={Style.text}>NFT's</h3>
                </div>
                <div className={Style.View}>
                  <h2 className={Style.number}>{CompanyData!=undefined? CompanyData.length - 1:0}</h2>
                  <h3 className={Style.text}>Sell</h3>
                </div>
                <div className={Style.View}>
                  <h2 className={Style.number}>{CompanyData!=undefined? CompanyData.length + 5:0}</h2>
                  <h3 className={Style.text}>Purchase's</h3>
                </div>
              </div>
              {
                nftData.data?data[0].to.toLowerCase() != ContextAddress.toLowerCase()?<>
                <div style={{display:"flex",flexDirection:"row"}}>
                <BuyFunction nftData={nftData} item={data}/>
                <button className={Style.buyButton} onClick={() => UserWishList(data, nftData.data.company)} >Add to Wishlist</button>
              </div></>:<>
              <div>
                <button className={Style.buyButton}>OWNED BY YOU</button>
              </div></>:<></>
              }
            </div>
          </div>
          <h1 className={Style.title} style={{fontSize:"72px",margin:"40vh 0vh"}}>
            {" "}
            A {nftData.data ? nftData.data.company : "Nft"} Product{" "}
          </h1>
        

          {/* <Prices/> */}
          <h1 className={Style.title}>
            {" "}
            Live {nftData.data ? nftData.data.company : "Nft"} Transactons{" "}
          </h1>
          {CompanyData != undefined ? (
            <Company CompanyData={CompanyData} />
          ) : (
            <></>
          )}
        </div>

        <div></div>
      </div>
    </>
  );
};

export default ProductDetails;
