import Deso from "deso-protocol";
import {
  Space,
  Avatar,
  Text,
  Button,
  Paper,
  Center,
  Group,
} from "@mantine/core";
import {
  GetSingleProfileResponse,
  // PostEntryResponse,
  GetFollowsResponse,
} from "deso-protocol-types";
import { useEffect, useState } from "react";
import { PublicKey } from "../../State/App.state";
import { useRecoilState } from "recoil";
import { ProfilePic } from "../../Components/ProfilePic";
import { Posts } from "../Posts/Posts";

const deso = new Deso();

export interface ProfileCardProps {
  publicKey: string;
}
export const ProfileCard = () => {
  const [publicKey, setPublicKey] = useRecoilState(PublicKey);

  return (
    <>
      {publicKey ? (
        <Paper
          shadow="xl"
          radius="xs"
          withBorder
          p="lg"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
          })}
        >
          <ProfilePic publicKey={publicKey as string} />
          <Button fullWidth variant="default" radius="md" mt="xl" size="md">
            Follow
          </Button>
          
        </Paper>
        
       
      ) : (
        <Paper
          shadow="xl"
          radius="xs"
          withBorder
          p="lg"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
          })}
        >
          <Center>
            <Avatar
              variant="gradient"
              size={77}
              radius={77}
              mx="auto"
              src={null}
            />
          </Center>
          <Space h="md" />
          <Text align="center">
            Please Log In or Sign Up to View your profile
          </Text>
        </Paper>
      )}
    </>
  );
};

const FollowerDisplay = ({ followers, following }: FollowerInfo) => {
  const [post, setPost] = useState("");
  useEffect(() => {}, [post, setPost]);
  return (
    <>
      <Group>
        <Text>{followers && `following: ${following.NumFollowers}`}</Text>
        <Text>{followers && `followers: ${followers.NumFollowers}`}</Text>
      </Group>
    </>
  );
};
type FollowerInfo = {
  followers: GetFollowsResponse;
  following: GetFollowsResponse;
};
