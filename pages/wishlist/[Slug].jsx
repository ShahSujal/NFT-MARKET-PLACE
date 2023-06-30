import React, { useContext, useEffect } from "react";

// Next Router
import { useRouter } from "next/router";

// Styling
import Style from "../style/WishList.module.css";

// Mapping WishList Function
import WishListMapFunction from "./WishListMapFunction";

// Importing Context
import { NftContext } from "../../context/Context";
import LoadingScreen from "../Loader/LoadingScreen";

// Main Function
const Wishlist = () => {

  // Intializing Router
  const router = useRouter();

  // Detecting query /wishlist/xyz
  const { Slug } = router.query;

  // Storing Context in Variable
  const context = useContext(NftContext);

  // Destructuring Context Data 
  const { ContextAddress,UserWishLists,ContextData } = context;
  
  
  // useEffect data call
  useEffect(() => {
    // UserWishLists();
  }, []);


  return (
    // Main container
    <>
    {
      ContextData?<>
      <div className={Style.container}>

{/* Title Page */}
<h1 className={Style.containerTitle}> Your WishList Items</h1>

{/* Wrap data */}
<div className={Style.wrapper}>

  {/* Mapping */}
  {ContextData ? (
    ContextData.map((item) => {
      return <WishListMapFunction item={item.nft} key={item._id} />;
    })
  ) : (
    
    <>
    <div>
      <h1>No WishList Item</h1>
    </div>
    </>

  )}
</div>
</div>
      </>:<>
      <LoadingScreen/>
      </>
    }
    </>
  );
};

export default Wishlist;
