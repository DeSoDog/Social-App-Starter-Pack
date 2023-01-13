import { Space, Avatar, Text, Button, Paper, Center } from "@mantine/core";
import { PublicKey } from "../../State/App.state";
import { useRecoilValue } from "recoil";
import { ProfilePic } from "../../Components/ProfilePic";

export interface ProfileCardProps {
  publicKey: string;
}
export const ProfileCard = () => {
  const publicKey = useRecoilValue(PublicKey);

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
