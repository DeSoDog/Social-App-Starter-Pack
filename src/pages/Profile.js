import Deso from "deso-protocol";
import { useState } from "react";
import { ProfileCard } from "../Sections/Profile/ProfileCard";
import { useRecoilValue } from "recoil";
import { PublicKey } from "../State/App.state";
import { Posts } from "../Sections/Posts/Posts";


const deso = new Deso();

export default function Profile() {
    const publicKey = useRecoilValue(PublicKey);
  return (
    <>
    <div>
      <ProfileCard />
       
      
          
    </div>
    <div>
      <Posts publicKey={publicKey} />
      </div>
      </>
  );
}
