import React,{useState} from "react";
import Style from "../style/SideBar.module.css";
import Link from "next/link";
import Image from 'next/image'
import {MdAdminPanelSettings,MdOutlineApi,MdOutlineDashboard} from 'react-icons/md'
import {DiCodeigniter,DiDatabase} from 'react-icons/di'
const SideBar = () => {
  const [Status, setStatus] = useState(false)
  return (
    <div className={Style.SideBar}>
      <div className={Style.Section}>
        {/* <Image src={require('../../public/favicon.png')} width={100} height={100} alt={'no image'} style={{margin:'auto',resize:"initial"}}/> */}
        <div className={Style.Contain} onClick={()=>setStatus(!Status)}>
          {/* <Link href={"/"}> */}
            <h2>Status</h2>
          {/* </Link> */}
          <MdOutlineDashboard size={17} color={'#fff'}/>
        </div>
        <div className={Style.ContainSmall}
         style={Status==true?{display:"none"}:{display:"flex"}}>
        <div className={Style.control_group}>
    {/* <h1>Radio buttons</h1> */}
    <label className={Style.LabelRadio}>First radio
      <input type="radio" name="radio" className={Style.input} checked="checked" style={{display:"block",opacity:1}}/>
      <div className={Style.control__indicator}></div>
    </label>
    <label className={Style.LabelRadio}>Second radio
      <input type="radio" name="radio" className={Style.input}/>
      <div className={Style.control__indicator}></div>
    </label>
    <label className={Style.LabelRadio}>Disabled
      <input type="radio" name="radio2" className={Style.input} disabled="disabled"/>
      <div className={Style.control__indicator}></div>
    </label>
    <label className={Style.LabelRadio}>Disabled & checked
      <input type="radio" name="radio2" className={Style.input} disabled="disabled" checked="checked"/>
      <div className={Style.control__indicator}></div>
    </label>
  </div>
        </div>

        <div className={Style.Contain}>
         
            <h2>Price</h2>
          <MdOutlineApi size={17} color={'#fff'}/>
        </div>
        <div className={Style.Contain}>
          <Link href={"/DataBase"}>
            <h2>Company</h2>
          </Link>
          <DiDatabase size={17} color={'#fff'}/>
        </div>
        <div className={Style.Contain}>
          <Link href={"/Code"}>
            <h2>Returns</h2>
          </Link>
          <DiCodeigniter size={17} color={'#fff'}/>
        </div>
        <div className={Style.Contain}>
          <Link href={"/Security"}>
            <h2>Security</h2>
          </Link>
          <MdAdminPanelSettings size={17} color={'#fff'}/>
        </div>
      </div>
    </div>
  );
};

export default SideBar;