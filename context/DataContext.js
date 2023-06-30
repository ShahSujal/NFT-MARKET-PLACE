import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Web3Modal from 'web3modal'
import { Web3Provider } from "@ethersproject/providers";
import NFT_MARKET from '../NFTMarket.json'
import { Contract,BigNumber } from "ethers";


export const RapidContext = createContext();



const DataContext = ({ children }) => {
    const [Address, setAddress] = useState(undefined)
    const [Signer, setSigner] = useState(undefined)
    const router = useRouter()
    
    const NFT_MARKET_ADDRESS = '0x712226E4A730A98e2443dC0B2908827D117a9d09'
    const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi,Signer);
   
    useEffect(() => {
  if(Address == undefined){
    setCall()
  }}, [Address])
    
    const setCall = async()=>{
        try {
          const web3modal = new Web3Modal({ cacheProvider: true });
          const instance = await web3modal.connect();
          const provider = new Web3Provider(instance);
          const signer = provider.getSigner();
          setSigner(signer)
          const address = await signer.getAddress();
          setAddress(address);
          console.log(address);
         } catch (e) {
           console.log(e);
         } 
      }

    //   Listed Nft's
  const GET_LISTED_NFTS = gql`
query GetListedNFTs($currentAddress: String!) {
    nfts(
      where: {
        to: "${"0x712226E4A730A98e2443dC0B2908827D117a9d09"}"
        from_not: $currentAddress
      }
    ) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;
  const ListedNfts = useQuery(GET_LISTED_NFTS, {
    variables: { currentAddress: Address ?? "" },
  });
  

  


// Profile Owned Nfts
  const GET_OWNED_NFTS = gql`
  query GetOwnedNFTs($owner: String!) {
    nfts(where: { to: $owner }) {
      id
      from
      to
      tokenURI
      price
    }
  }
  `;
  const ProfileNft = useQuery(GET_OWNED_NFTS, {
    variables: { owner: Address?Address:"" },
  });
   
    
  return (
    <RapidContext.Provider value={{ListedNfts,ProfileNft,Address}}>
      {children}
    </RapidContext.Provider>
  );
};
export default DataContext;
