import React, { useContext, useEffect } from "react";

//  Next Image & Link
import Image from "next/image";
import Link from "next/link";

// Next Context
import { RapidContext } from "../../context/DataContext";

// Styling
import Style from "../style/Profile.module.css";

// Mapping Function
import ProfileOwnedNft from "./ProfileOwnedNft";

// Main Function
const ProfileContent = () => {

  // Storing Context
  const context = useContext(RapidContext);

  // Destructured data
  const { ProfileNft, Address } = context;

  return (
    <div className={Style.container}>

      {/* Baground Image */}
      <div className={Style.ImageBackGround}>
        <Image
          src={require("../../public/bgProfile.jpg")}
          className={Style.BgImage}
          alt={"no image found"}
          priority={true}
        />
      </div>

      {/* Create New Nft */}
      <div className={Style.box}>
        <Link href={"/Create/Create"}>
          <button className={Style.Mint}> Mint</button>
        </Link>

        {/* .Profile Picture */}
        <div className={Style.image}>
          <Image
            src={require("../../public/nft-icon.jpg")}
            className={Style.ProfileImage}
            alt={"no image found"}
          />
        </div>
        
        {/* User Name */}
        <div>
          <h1 className={Style.Name}>Sujal Shah</h1>
        </div>

        {/* User Address MetaMask */}
        <div>
          <h2 className={Style.ContactAdress}>
            Account:- {Address != undefined ? Address : "XXXXXXXXXXXXXXXXXX"}
          </h2>
        </div>

        {/* Small-Small Details */}
        <div className={Style.Total}>

          {/* Content1 */}
          <div className={Style.View}>
            {/* Owned Nfts */}
            <h2 className={Style.number}>
              {ProfileNft.data ? ProfileNft.data.nfts.length : "0"}
            </h2>
            <h3 className={Style.text}>NFT&apos;s</h3>
          </div>

          {/* Content2 */}
          <div className={Style.View}>
          {/* Total Buy Nft */}
            <h2 className={Style.number}>222</h2>
            <h3 className={Style.text}>Sell</h3>
          </div>

         {/* Total List Nfts */}
          <div className={Style.View}>
            <h2 className={Style.number}>542</h2>
            <h3 className={Style.text}>Purchase&apos;s</h3>
          </div>
        </div>

        {/* Title */}
        <h1 className={Style.title}>Your Owned Nft&apos;s</h1>

        {/* Data Store Class*/}
        <div className={Style.Contents}>
          {ProfileNft.data ? (
            ProfileNft.data.nfts.length > 0 ? (
              ProfileNft.data.nfts.map((item) => {
                return (
                  <div key={item.id}>
                    <ProfileOwnedNft item={item} />
                  </div>
                );
              })
            ) : (
              <div>
                <Image
                  src={require("../../public/Cute.gif")}
                  width={1080}
                  height={1080}
                  className={Style.NotFound}
                  alt="no image found"
                />
                <h1 className={Style.title}>Oops No Nft</h1>
              </div>
            )
          ) : (
            <>
              <Image
                src={require("../../public/Cute.gif")}
                width={1080}
                height={1080}
                className={Style.NotFound}
                alt="no image found"
              />
            </>
          )}
        </div>

        {/* Account Created */}
        <h3 className={Style.text}> Since 12 December 2022</h3>
      </div>
      <div></div>
    </div>
  );
};

export default ProfileContent;
