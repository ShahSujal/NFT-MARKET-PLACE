import React from "react";

// Next Router
import { useRouter } from "next/router";

// Mapping Nft
import ProductDetails from "../other/ProductDetails";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import LoadingScreen from "../Loader/LoadingScreen";
const Post = () => {
  const router = useRouter();
  const { Slug } = router.query;
  const GET_OWNED_NFTS = gql`
    query GetOwnedNFTs($id: String!) {
      nfts(where: { id: $id }) {
        from
        to
        tokenURI
        id
        price
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_OWNED_NFTS, {
    variables: { id: Slug },
  });
  // console.log(data);
  return (
    <div>
       <Head>
        <title>NFT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {data ? <ProductDetails data={data.nfts} /> :<LoadingScreen/>}
    </div>
  );
};
export default Post;
