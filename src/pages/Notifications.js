import Deso from "deso-protocol";
import { useRecoilValue } from "recoil";
import { PublicKey } from "../State/App.state";
import { useEffect, useState } from "react";
import {
  Avatar,
  Paper,
  Group,
  Text,
  Space,
  Center,
  Divider,
  Skeleton,
} from "@mantine/core";
const deso = new Deso();

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [profilePics, setProfilePics] = useState("");
  const [userName, setUsername] = useState("");
  const publicKey = useRecoilValue(PublicKey);
  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    const request = {
      NumToFetch: 50,
      PublicKeyBase58Check: publicKey,
      FetchStartIndex: 1000,
    };
    const response = await deso.notification.getNotifications(request);

    const profilePics = {};

    response.data.Notifications.forEach((notification) => {
      profilePics[
        notification.Metadata.AffectedPublicKeys[0].PublicKeyBase58Check
      ] = deso.user.getSingleProfilePicture(
        notification.Metadata.AffectedPublicKeys[0].PublicKeyBase58Check
      );
    });

    setNotifications(response.data.Notifications);
    setProfilePics(profilePics);
  };

  return (
    <div>
      <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
              Notifications
            </Text>
          </>
        }
        labelPosition="center"
      />

      {publicKey ? (
        <>
          {notifications.map((notification, index) => (
            <div key={index}>
              <Space h="sm" />
              <Center>
                <Paper shadow="lg" p="md" withBorder>
                  <Group>
                    <Avatar
                      size={33}
                      radius={33}
                      src={
                        profilePics[
                          notification.Metadata.AffectedPublicKeys[0]
                            .PublicKeyBase58Check
                        ]
                      }
                    />

                    <Text>{notification.Metadata.TxnType}</Text>
                  </Group>
                </Paper>
              </Center>
              <Space h="sm" />
            </div>
          ))}
        </>
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
              Please login to view your Notifications.
            </Text>
          </Paper>
        </Center>
      )}
    </div>
  );
}
