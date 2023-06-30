import React, { useContext } from "react";
import Head from "next/head";

// Next Router & Image
import { useRouter } from "next/router";
import Image from "next/image";

// Styling
import Style from "../style/Trending.module.css";

// Mapping Function Nft
import TrendingPurchaseCart from "./TrendingPurchaseCart";

// Import Context
import { RapidContext } from "../../context/DataContext";
import SideBar from "../other/SideBar";
import LoadingScreen from "../Loader/LoadingScreen";

const Trend = () => {

  // Storing Context in variable
  const dataContext = useContext(RapidContext);

  // Destructuring Context
  const { ListedNfts } = dataContext;

  // Intializing Router 
  const router = useRouter();


  return (
    // Main Container
    <div className={Style.container} style={{background:"black"}}>
        <Head>
        <title>Trending Nft's</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* List Nft Data is Loaded Then */}
      {ListedNfts.data ? (
        <>
        {/* <SideBar/> */}
          <div className={Style.wrapper}>
            {ListedNfts.data.nfts.length > 0 ? (
              // Mapping Function
              ListedNfts.data.nfts.map((item) => {
                return (
                  <div key={item.id} className={Style.trendingMargin}>
                    <TrendingPurchaseCart item={item} />
                  </div>
                );
              })
            ) : (
              <div>
                {/* If List Is Empty */}
                <Image
                  src={require("../../public/LoaderGif.gif")}
                  alt="no image"
                  className={Style.NotFound}
                  priority={true}
                />
                <h2 className={Style.title}>Market is Empty</h2>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
        {/* If Data is Loading */}
       <LoadingScreen/>
          {/* <h1 className={Style.title}>Loading..</h1> */}
        </>
      )}
    </div>
  );
};

export default Trend;