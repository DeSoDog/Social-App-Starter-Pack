import { Grid, Paper, Center, Divider, Text, Space } from "@mantine/core";
import { TwitchPlayer } from "react-twitch-embed";
import { useRef } from "react";

export default function Discover() {
  const embed = useRef(); // We use a ref instead of state to avoid rerenders.

  const handleReady = (e) => {
    embed.current = e;
  };
  return (
    <>
      <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
              Discover
            </Text>
          </>
        }
        labelPosition="center"
      />
      <Space h="xl" />
      <Grid grow>
        <Grid.Col span={4}>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                shanks_ttv
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="shanks_ttv"
                autoplay
                muted
                width={333}
                onReady={handleReady}
                id="1"
              />
            </Paper>
          </Center>
        </Grid.Col>
        <Grid.Col span={4}>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                GMHikaru
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="GMHikaru"
                autoplay
                muted
                width={333}
                onReady={handleReady}
                id="2"
              />
            </Paper>
          </Center>
        </Grid.Col>
        <Grid.Col span={4}>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                sgares
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="sgares"
                autoplay
                muted
                width={333}
                onReady={handleReady}
                id="3"
              />
            </Paper>
          </Center>
        </Grid.Col>
        <Grid.Col span={4}>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                shroud
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="shroud"
                autoplay
                muted
                width={333}
                onReady={handleReady}
                id="4"
              />
            </Paper>
          </Center>
        </Grid.Col>
        <Grid.Col span={4}>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
              <Text
                align="center"
                size="xl"
                lineClamp={4}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                subroza
              </Text>
              <Divider my="sm" variant="dotted" />
              <TwitchPlayer
                channel="subroza"
                autoplay
                muted
                width={333}
                onReady={handleReady}
                id="5"
              />
            </Paper>
          </Center>
        </Grid.Col>
      </Grid>
    </>
  );
}
