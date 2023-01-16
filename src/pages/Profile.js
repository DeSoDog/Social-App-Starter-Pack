import { ProfileCard } from "../Sections/Profile/ProfileCard";
import { useRecoilValue } from "recoil";
import { PublicKey } from "../State/App.state";
import { Posts } from "../Sections/Posts/Posts";
import { TwitchEmbed } from "react-twitch-embed";
import { Paper, Space, TextInput, Button } from "@mantine/core";
import { useState } from "react";

export default function Profile() {
  const publicKey = useRecoilValue(PublicKey);
  const [channel, setChannel] = useState();
  const [showPlayer, setShowPlayer] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setChannel(e.target[0].value);
    setShowPlayer(true);
  };

  return (
    <>
      <div>
        <ProfileCard />
      </div>
      <Space h="md" />
      <Paper shadow="xl" radius="sm" p="md" withBorder align="center">
        <form onSubmit={handleSubmit}>
          <TextInput
            placeholder="Enter your Twitch Channel Name"
            radius="xl"
            type="text"
          />
          <Space h="md" />
          <Button variant="outline" size="xs" type="submit">
            Submit
          </Button>
          <Space h="md" />
        </form>
        {showPlayer && (
          <TwitchEmbed
            width={"100%"}
            channel={channel}
            autoplay
            muted
            withChat
            darkMode={true}
          />
        )}
      </Paper>
      <div>
        <Posts publicKey={publicKey} />
      </div>
    </>
  );
}
