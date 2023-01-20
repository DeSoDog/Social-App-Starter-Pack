import {
  Space,
  Avatar,
  Text,
  Paper,
  Center,
  Group,
} from "@mantine/core";
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
        </Paper>
      ) : (
        <Center>
          <Paper shadow="xl" radius="lg" p="xl" withBorder>
            <Space h="xl" />
            <Text
              size="xl"
              lineClamp={4}
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            >
              Please login to view your Profile.
            </Text>

            <Space h="xl" />
            <Group position="center">
              <Avatar size={77} radius="xl" />
            </Group>
            <Space h="xl" />
          </Paper>
        </Center>
      )}
    </>
  );
};
