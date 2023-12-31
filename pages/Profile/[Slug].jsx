import React from "react";
import ProfileContent from "./ProfileContent";
import Head from "next/head";
// Main Function
const Profile = () => {
  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      {/* SubClass Of Profile For clean Code */}
      <ProfileContent />
      
    </div>
  );
};

export default Profile;
