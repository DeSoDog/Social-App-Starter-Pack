import { Grid, Paper, Center, Divider, Text } from "@mantine/core";
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
      <Grid grow>
        <Grid.Col span={4}>
          <Center>
            <Paper shadow="xl" radius="md" p="xs">
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
