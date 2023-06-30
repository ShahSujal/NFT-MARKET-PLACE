import React from 'react'
import Image from 'next/image'
const LoadingScreen = () => {
  return (
    <div style={{width:'100%',height:"80vh",background:"black",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Image
            src={require("../../public/tchange.gif")}
            width={1080}
            height={1080}
            alt="no image found"
            style={{width:"700px",height:"700px",objectFit:"contain"}}
            priority={true}
          />
    </div>
  )
}

export default LoadingScreen
