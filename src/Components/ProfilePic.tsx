import Deso from "deso-protocol";
import { useEffect, useState } from "react";

export interface ProfilePicProps {
  publicKey: string;
}
const deso = new Deso();
export const ProfilePic = ({ publicKey }: ProfilePicProps) => {
  useEffect(() => {
    getProfilePic();
  }, []);

  const [pic, setProfilePic] = useState("");
  const getProfilePic = async () => {
    const profilePic = await deso.user.getSingleProfilePicture(publicKey);
    setProfilePic(profilePic);
  };

  return (
    <img
      className="rounded-full min-h-[40px] max-h-[40px] max-w-[40px] min-w-[40px] mr-2"
      src={pic}
    />
  );
};
