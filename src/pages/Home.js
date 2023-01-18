import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { PublicKey } from "../State/App.state";

import {
  Text,
  Avatar,
  Group,
  createStyles,
  Paper,
  TypographyStylesProvider,
  Center,
  Space,
  ActionIcon,
  Tooltip,
  TextInput,
  Button,
  Image,
} from "@mantine/core";
import {
  IconHeart,
  IconDiamond,
  IconRecycle,
  IconMessageCircle,
} from "@tabler/icons";
import { useRecoilValue } from "recoil";

const deso = new Deso();

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
    wordWrap: "break-word",
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

export default function Home() {
  const [post, setPost] = useState("");
  const [feed, setFeed] = useState([]);
  const [profilePics, setProfilePics] = useState("");
  const publicKey = useRecoilValue(PublicKey);
  const { classes } = useStyles();
  useEffect(() => {}, [post, setPost]);
  useEffect(() => {
    getFeed();
  });
  const getFeed = async () => {
    const request = {
      PublicKeyBase58Check:
        "BC1YLiHVU5UCHeP1MzMUoDAptWK1zXJm68JCumFB4v6CeaSkk6c1v8U",
      ReaderPublicKeyBase58Check:
        "BC1YLiHVU5UCHeP1MzMUoDAptWK1zXJm68JCumFB4v6CeaSkk6c1v8U",
      NumToFetch: 40,
    };

    const response = await deso.posts.getPostsStateless(request);
    console.log(response);
    if (!response) {
      console.log("No response from the server");
    }
    const profilePics = {};
    response.PostsFound.forEach((post) => {
      profilePics[post.ProfileEntryResponse.PublicKeyBase58Check] =
        deso.user.getSingleProfilePicture(
          post.ProfileEntryResponse.PublicKeyBase58Check
        );
    });
    console.log(response.PostsFound);

    setFeed(response.PostsFound);
    setProfilePics(profilePics);
  };

  return (
    <>
      <Center>
        <Paper shadow="xl" radius="xl" p="xl">
          <div className="flex justify-center">
            <TextInput
              variant="unstyled"
              placeholder="Let them hear your voice!"
              radius="md"
              size="xl"
              value={post}
              onChange={(e) => {
                setPost(e.target.value);
              }}
              className="ml-2 min-w-[400px] min-h-[50px] text-black"
            />
          </div>
          <Space h="md" />
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={async () => {
                console.log(post);
                if (!post) {
                  return;
                }
                await deso.posts.submitPost({
                  UpdaterPublicKeyBase58Check: publicKey,
                  BodyObj: {
                    Body: post,
                    VideoURLs: [],
                    ImageURLs: [],
                  },
                });
                setPost("");
              }}
            >
              Create
            </Button>
          </div>
        </Paper>
      </Center>
      <div>
        <Space h="md" />

        {feed.map((post) => (
          <Paper
            m="md"
            shadow="lg"
            radius="xl"
            p="xl"
            withBorder
            className={classes.comment}
            key={post.PostId}
          >
            <Group>
              <Space w="xs" />
              <Avatar
                size={33}
                radius={33}
                src={
                  profilePics[post.ProfileEntryResponse.PublicKeyBase58Check]
                }
              />
              <Text weight="bold" size="sm">
                {post.ProfileEntryResponse.Username}
              </Text>
            </Group>

            <TypographyStylesProvider>
              <Text align="center" size="md" className={classes.body}>
                {post.Body}
              </Text>
            </TypographyStylesProvider>
            <Space h="md" />
            {post.ImageURLs && (
              <div
                style={{
                  width: 333,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Image
                  src={post.ImageURLs[0]}
                  radius="md"
                  alt="post-image"
                  width="100%"
                />
              </div>
            )}
            <Space h="md" />
            <Center>
              <Tooltip
                transition="slide-down"
                withArrow
                position="bottom"
                label="Like"
                transitionDuration={444}
              >
                <ActionIcon variant="subtle" radius="md" size={36}>
                  <IconHeart size={18} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
              <Text size="xs" color="dimmed">
                {post.LikeCount}
              </Text>
              <Space w="sm" />
              <Tooltip
                transition="slide-down"
                withArrow
                position="bottom"
                label="Repost"
                transitionDuration={444}
              >
                <ActionIcon variant="subtle" radius="md" size={36}>
                  <IconRecycle size={18} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
              <Text size="xs" color="dimmed">
                {post.RepostCount}
              </Text>
              <Space w="sm" />
              <Tooltip
                transition="slide-down"
                withArrow
                position="bottom"
                label="Diamonds"
                transitionDuration={444}
              >
                <ActionIcon variant="subtle" radius="md" size={36}>
                  <IconDiamond size={18} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
              <Text size="xs" color="dimmed">
                {post.DiamondCount}
              </Text>

              <Space w="sm" />

              <Tooltip
                transition="slide-down"
                withArrow
                position="bottom"
                label="Comments"
                transitionDuration={444}
              >
                <ActionIcon variant="subtle" radius="md" size={36}>
                  <IconMessageCircle size={18} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
              <Text size="xs" color="dimmed">
                {post.CommentCount}
              </Text>
            </Center>
          </Paper>
        ))}
      </div>
    </>
  );
}
