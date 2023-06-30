import React from 'react'
import Style from '../style/HomePage.module.css'
import Image from 'next/image'
const HomePage = () => {
  return (
    <div className={Style.container}>
      <div className={Style.banner}>
      <Image src={require('../../public/dd.webp')} className={Style.ImageBanner} alt={'no image found'} priority={true}/>
      <h1 className={Style.bannerTitle}>NFT MARKET</h1>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nemo amet praesentium quibusdam natus eum veritatis sunt quae, aperiam doloribus cupiditate expedita quasi distinctio.</p>
      </div>
      <div className={Style.box}>
    
        <Image src={require('../../public/nft.png')} className={Style.BoxImage} alt={'no image found'} priority={true}/>
        <div className={Style.BoxContent}>
         <h1>Buy, trade, and hold 350+ <br/> Polygon Mumbai on Binance</h1>
         <p> NFT marketplaces are your path to start investing in digital assets, collectibles, and art, but there are lots of options out there</p>
         <button>Trade Nft&apos;s Now</button>
        </div>
      </div>
      <div className={Style.list}>
        <div className={Style.contentItem}>
            <h1>$23 billion</h1>
            <p>24h trading volume on Binance exchange</p>
        </div>
        <div className={Style.contentItem}>
            <h1>350+</h1>
            <p>Cryptocurrencies listed</p>
        </div>
        <div className={Style.contentItem}>
            <h1>120 million</h1>
            <p>Registered users</p>
        </div>
        <div className={Style.contentItem}>
            <h1>0.10%</h1>
            <p>Lowest transaction fees</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
