import React from 'react'
// import '../style'
import Style from '../style/NavBar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {BsBalloonHeart} from 'react-icons/bs'
import {TbBrandUbuntu} from 'react-icons/tb'
import {MdWorkspacesOutline} from 'react-icons/md'

const NavBar = () => {
  return (
    <>
    <div className={Style.nav}>
    <div className={Style.logo}>
      <h2>NFT Market</h2>
      <Image src={require('../../public/favicon.png')} alt="hhh" width={40} height={40} className={Style.image}/>
    </div>
    <div className={Style.links}>
    <Link href={'/'}>
      <div className={Style.row}>
      <h3>Home</h3>
      <BsBalloonHeart size={16} className={Style.iconio}/>
      </div>
      </Link>
      <Link href={'/Trending/trend'}>
      <div className={Style.row}>
      <h3>Trending</h3>
      <TbBrandUbuntu size={18} className={Style.iconio}/>
      </div>
      </Link>
    <Link href={'/wishlist/6447fc105c88f749a8fcaa36'}>
      <div className={Style.row}>
      <h3>WishList</h3>
      <BsBalloonHeart size={16} className={Style.iconio}/>
      </div>
      </Link>
      {/* <Link href={'/other/Company'}>
      <div className={Style.row}>
      <h3>Company's</h3>
      <MdWorkspacesOutline size={18} className={Style.iconio}/>
      </div>
      </Link> */}
     <Link href={'/Profile/Profile'}>
     <div className={Style.row}>
      <h3>Profile</h3>
      <Image src={require('../../public/nft-icon.jpg')} alt='no image' width={30} height={30} className={Style.profile}/>
      </div>
      </Link>
      
    </div>
    </div>
    </>
  )
}

export default NavBar