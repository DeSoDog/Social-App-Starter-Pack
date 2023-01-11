import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { Avatar, Text } from "@mantine/core";

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

  return <Avatar variant="gradient" size={77} radius={77} mx="auto" src={pic} />;
};
