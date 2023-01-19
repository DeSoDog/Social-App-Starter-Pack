import { Space, Skeleton, Text, Button, Paper, Center } from "@mantine/core";
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
        <Center>
          <Paper shadow="xl" radius="lg" p="xl" withBorder>
            <Space h="xl" />
            <Space h="xl" />
            <Skeleton height={50} circle mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
            <Space h="xl" />
            <Text
              size="xl"
              lineClamp={4}
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            >
              Please login to view your Profile.
            </Text>
          </Paper>
        </Center>
      )}
    </>
  );
};
