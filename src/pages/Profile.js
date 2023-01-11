import Deso from "deso-protocol";
import { useState } from "react";
import { ProfileCard } from "../Sections/Profile/ProfileCard";
import { useRecoilValue } from "recoil";
import { PublicKey } from "../State/App.state";

const deso = new Deso();

export default function Profile() {
  

  return (
    
    <div>
      <ProfileCard />
    </div>
  );
}
