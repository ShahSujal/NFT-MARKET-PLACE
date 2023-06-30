import Style from '../style/Create.module.css'
import React, { useContext, useState } from 'react'
import { Contract } from 'ethers'
import NFT_MARKET from '../../NFTMarket.json'
import {NftContext} from '../../context/Context'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

const Create = () => {
  const [DataImage, setDataImage] = useState()
  const [DataCompany, setDataCompany] = useState()
  const [DataName, setDataName] = useState()
  const [DataDesc, setDataDesc] = useState()
  const [DataType, setDataType] = useState()
  const [urlImage,setUrlImage] = useState()
  const NFT_MARKET_ADDRESS = '0x712226E4A730A98e2443dC0B2908827D117a9d09'
  const context = useContext(NftContext)
  const {ContextSigner} = context
    const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, ContextSigner);
  const generateUrl=()=>{
    let url = window.URL.createObjectURL(DataImage);
    console.log(url);
    setUrlImage(url)
  } 
  var binaryData = [];
  useEffect(() => {
    console.log(DataImage);
    if (DataImage) {
      let urlencoded = window.URL.createObjectURL(DataImage);
      setUrlImage(urlencoded)
      console.log(DataImage);
    }
  }, [DataImage])
  
    const uploadToClient = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        setDataImage(i);
      }
    };
    const createNFT = async () => {
      // console.log(DataImage.uri);
      console.log(DataImage,DataName,DataDesc,DataType,DataCompany);
     



      try {
        const data = new FormData();
        data.append("image", DataImage);
        data.append("name", DataName);
        data.append("description", DataDesc);
        data.append("type", DataType);
        data.append("company", DataCompany);
        const response = await fetch("/api/nftStorage", {
          method: "POST",
          body: data,
        });
        if (response.status == 201) {
          const json = await response.json();
          const transaction = await nftMarket.createNFT(
            json.uri
          );
          await transaction.wait();
      console.log(transaction);
        }
      } catch (e) {
        console.log(e);
      }
    };
  


    return (
    // <div>
    //   <input type='file' className='' placeholder='Image' name='' onChange={(e)=>{uploadToClient(e)}}/>
    //   <input type='text' className='' placeholder='Type your Company' name='' onChange={(e)=>{setDataCompany(e.target.value)}}/>
    //   <input type='text' className='' placeholder='set your desc' name='' onChange={(e)=>{setDataDesc(e.target.value)}}/>
    //   <input type='text' className='' placeholder='setDataType' name='' onChange={(e)=>{setDataType(e.target.value)}}/>
    //   <input type='text' className='' placeholder='setDataName' name='' onChange={(e)=>{setDataName(e.target.value)}}/>
    //   <button className='' onClick={()=>{createNFT()}}>Submit</button>
    //   {
    //      urlImage?
    //      <Image src={urlImage} width={400} height={400} />:<></>
    //   }
    // </div>


    <div className={Style.signup}>
    <div className={Style.ImageContainer}>
        <Image src={require('../../public/jungleBook2.png')} width={'auto'} height={'auto'} alt={'no image'} className={Style.image} priority={true}/>
    </div>

    <div className={Style.signupContent}>
        <h2>Create Nft now..</h2>
        
      {urlImage?<Image src={urlImage} width={400} height={400} priority={true} className={Style.NftImage} alt='No image' />:<></>}
        <div className={Style.row}>
        <input type="text" placeholder='NFT Name' onChange={(e)=>{setDataName(e.target.value)}} />
        <input type="text" placeholder='NFT Company'onChange={(e)=>{setDataCompany(e.target.value)}} />
        </div>
        <div className={Style.row}>
        <input type="text" placeholder='NFT Type' onChange={(e)=>{setDataType(e.target.value)}} />
        <input type="file" placeholder='image' onChange={(e)=>{uploadToClient(e)}} id={Style.inputEdit} />
        </div>
        <button onClick={()=>{createNFT()}}>Mint Nft</button>
        <Link href={'/'}>
        <h3>Cancel</h3>
        </Link>
    </div>
</div>
  )
}

export default Create
