import Deso from "deso-protocol";
import { Avatar, Text, Button, Paper, Center, Group } from "@mantine/core";
import {
  GetSingleProfileResponse,
  // PostEntryResponse,
  GetFollowsResponse,
} from "deso-protocol-types";
import { useEffect, useState } from "react";
import { PublicKey } from "../../State/App.state";
import { useRecoilState } from "recoil";
import { ProfilePic } from "../../Components/ProfilePic";
// import {ProfilePic} from

const deso = new Deso();
export interface ProfileCardProps {
  publicKey: string;
}
export const ProfileCard = () => {
  const [profilePic, setProfilePic] = useState("");
  const [profile, setProfile] = useState<null | GetSingleProfileResponse>(null);

  const [publicKey, setPublicKey] = useRecoilState(PublicKey);
  const [userName, setUserName] = useState("");

 

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
          <Text align="center" size="lg" weight={777} mt="md">
            @{userName}
          </Text>

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
          <Button
            onClick={async () => {
              await deso.identity.login("2");
              const loggedInUserKey = deso.identity.getUserKey();
              setPublicKey(loggedInUserKey as string);
             
            }}
            fullWidth
            variant="default"
            radius="md"
            mt="xl"
            size="md"
          >
            Sign In
          </Button>
        </Paper>
      )}
    </>
  );
};
