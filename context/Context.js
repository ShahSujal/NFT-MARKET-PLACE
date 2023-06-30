import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Web3Modal from 'web3modal'
import {Web3Provider } from "@ethersproject/providers";


export const NftContext = createContext();


const Context = ({ children }) => {
  const [ContextData,setContextData] = useState([])
  const [ContextAddress,setContextAddress] = useState()
  const [CompanyData,setCompanyData] = useState([])
  const [ContextSigner,setContextSigner] = useState({})
  const [ContextUser,setContextUser] = useState(undefined)
  const router = useRouter()
   const ContextUserPurchase = 12
   const ContextUserMint = 12
  useEffect(() => {  
      if (ContextAddress == undefined) {setCall()}
  }, [router.route,ContextAddress])

  const setCall = async()=>{
    try {
      const web3modal = new Web3Modal({ cacheProvider: true });
      const instance = await web3modal.connect();
      const provider = new Web3Provider(instance);
      const signer = provider.getSigner();
      setContextSigner(signer)
      const address = await signer.getAddress();
      setContextAddress(address);
     } catch (e) {
       console.log(e);
     } 
  }



  const UserLogin = async(username,password)=>{
    const res = await fetch(`${window.location.origin}/api/user/LoginUser`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
    const data = await res.json()
    console.log(data);
    if (data.success == true) {
      setContextUser(data.user)
      console.log(data);
      router.push('/')
    }
    else if(data.success == false){
      console.log(data.message);
    }
  }

  const UserWishList = async(nft,companyName)=>{
    const userId = ContextAddress
    const res = await fetch(`${window.location.origin}/api/wishlist/Wishlist`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        nft,
        companyName
      }),
    })
    const data = await res.json()
    console.log(data);
    if (data.success == true) {
      console.log(data);
    }
    else if(data.success == false){
      console.log(data.message);
    }
  }
  const UserTransaction = async(Transaction,companyName,TypeOfTransaction,tokenURI)=>{
    const userId = ContextAddress
    console.log(Transaction,companyName,TypeOfTransaction,tokenURI);
    const res = await fetch(`${window.location.origin}/api/transaction/AddTransaction`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        Transaction,
        companyName,
        TypeOfTransaction,
        tokenURI
      }),
    })
    const data = await res.json()
    console.log(data);
    if (data.success == true) {
      console.log(data);
    }
    else if(data.success == false){
      console.log(data.message);
    }
  }
  const CompanyTransaction = async(companyName)=>{
    const res = await fetch(`${window.location.origin}/api/transaction/CompanyTransactions`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName
      }),
    })
    const data = await res.json()
    if (data.success == true) {
      setCompanyData(data.transactions)
    }
    else if(data.success == false){
      console.log(data.message);
    }
  }

  const UserWishLists = async () => {
    const userId = ContextAddress
    const res = await fetch(
      `${window.location.origin}/api/wishlist/fetchWishList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.success == true) {
      console.log(data);
      setContextData(data.wishlist);
    } else if (data.success == false) {
      console.log(data.message);
    }
  };
 

 



  return (
    <NftContext.Provider value={{ContextAddress,ContextData,UserWishLists,ContextSigner,ContextUserMint,ContextUserPurchase,UserLogin,UserWishList,UserTransaction,CompanyTransaction,CompanyData}}>
      {children}
    </NftContext.Provider>
  );
};
export default Context;
