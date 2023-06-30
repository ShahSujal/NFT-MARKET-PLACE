import React, { useContext,useState, useEffect } from "react";

// Next Link & Image
import Link from "next/link";
import Image from "next/image";

// Styling
import Style from "../style/Create.module.css";

// Import Context
import { NftContext } from "../../context/Context";

// Login Function
const Login = () => {

    // Storing Context in variable
  const context = useContext(NftContext);

   // Destructuring Context
  const { UserLogin, ContextUser } = context;

  // States
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();

  return (
    <div className={Style.signup} style={{ minHeight: "100vh" }}>
      <div className={Style.ImageContainer}>
        {/* BackGround Image */}
        <Image
          src={require("../../public/jungleBook2.png")}
          width={"auto"}
          height={"auto"}
          alt={"no image"}
          className={Style.image}
          priority={true}
        />
      </div>

      <div className={Style.signupContent}>
        <h2>Login now..</h2>
        <div className={Style.row}>
          {/* UserName Input */}
          <input
            type="text"
            placeholder="enter your username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        {/* PassWord Input */}
        <input
          type="password"
          placeholder="enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        {/* Submit Button */}
        <button
          onClick={() => {
            UserLogin(Username, Password);
          }}
        >
          Continue
        </button>

        {/* Asking Question to Register */}
        <p>Not have a account?</p>

        {/* SignUp page Forward */}
        <Link href={"/validation/Login"}>
          <h3>Sign Up</h3>
        </Link>
        
      </div>
    </div>
  );
};

export default Login;
