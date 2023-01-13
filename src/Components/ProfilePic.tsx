import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { Avatar, Text, Center, Space } from "@mantine/core";
import {
  GetSingleProfileResponse,
  // PostEntryResponse,
  GetFollowsResponse,
} from "deso-protocol-types";

export interface ProfilePicProps {
  publicKey: string;
}
const deso = new Deso();
export const ProfilePic = ({ publicKey }: ProfilePicProps) => {
  useEffect(() => {
    getProfilePic();
  });

  const [pic, setProfilePic] = useState("");
  const [profile, setProfile] = useState<null | GetSingleProfileResponse>(null);
  const [followerInfo, setFollowers] = useState<null | FollowerInfo>(null);

  const getProfilePic = async () => {
    const profilePic = deso.user.getSingleProfilePicture(publicKey);

    const profile = await deso.user.getSingleProfile({
      PublicKeyBase58Check: publicKey,
    });

    const followers = await deso.social.getFollowsStateless({
      PublicKeyBase58Check: publicKey,
      GetEntriesFollowingUsername: true,
    });
    const following = await deso.social.getFollowsStateless({
      PublicKeyBase58Check: publicKey,
    });
    setProfilePic(profilePic);
    setProfile(profile);
    setFollowers({ following, followers });
  };

  return (
    <>
      <Avatar size={77} radius={77} mx="auto" src={pic} />
      <Center>
        <Text align="center" size="lg" weight={777} mt="md">
          {profile?.Profile?.Username && "@" + profile?.Profile?.Username}
        </Text>
      </Center>

      {followerInfo && (
        <FollowerDisplay
          followers={followerInfo.followers}
          following={followerInfo.following}
        />
      )}
    </>
  );
};

const FollowerDisplay = ({ followers, following }: FollowerInfo) => {
  return (
    <>
      <Center>
        <Text>{followers && `Following: ${following.NumFollowers}`}</Text>
        <Space w="sm" />
        <Text>{followers && ` Followers: ${followers.NumFollowers}`}</Text>
      </Center>
    </>
  );
};
type FollowerInfo = {
  followers: GetFollowsResponse;
  following: GetFollowsResponse;
};
