import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { PublicKey } from "../State/App.state";
import _ from "lodash";
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
  const [create, setPost] = useState("");
  const [feed, setFeed] = useState([]);

  const publicKey = useRecoilValue(PublicKey);
  const { classes } = useStyles();
  useEffect(() => {}, [create, setPost]);
  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    const request = {
      PublicKeyBase58Check:
        "BC1YLiHVU5UCHeP1MzMUoDAptWK1zXJm68JCumFB4v6CeaSkk6c1v8U",
      ReaderPublicKeyBase58Check:
        "BC1YLiHVU5UCHeP1MzMUoDAptWK1zXJm68JCumFB4v6CeaSkk6c1v8U",
      NumToFetch: 40,
    };
    const response = await deso.posts.getPostsStateless(request);
    console.log(response.PostsFound);
    if (!response) {
      console.log("No response from the server");
    }
    setFeed(response.PostsFound);
  };

  return (
    <>
      {publicKey ? (
        <Group position="center">
          <Paper shadow="xl" radius="xl" p="xl">
            <Avatar
              size={44}
              radius={33}
              src={deso.user.getSingleProfilePicture(publicKey)}
            />
            <TextInput
              variant="unstyled"
              placeholder="Let them hear your voice!"
              radius="md"
              size="xl"
              value={create}
              onChange={(e) => {
                setPost(e.target.value);
              }}
              className="ml-2 min-w-[400px] min-h-[50px] text-black"
            />

            <Space h="md" />
            <Group position="right">
              <Button
                variant="outline"
                onClick={async () => {
                  if (!create) {
                    return;
                  }
                  await deso.posts.submitPost({
                    UpdaterPublicKeyBase58Check: publicKey,
                    BodyObj: {
                      Body: create,
                      VideoURLs: [],
                      ImageURLs: [],
                    },
                  });
                  setPost("");
                }}
              >
                Create
              </Button>
            </Group>
          </Paper>
        </Group>
      ) : (
        <Center>
          <Paper shadow="xl" radius="xl" p="xl">
            <Avatar size={44} radius={33} />
            <TextInput
              variant="unstyled"
              placeholder="Let them hear your voice!"
              radius="md"
              size="xl"
              className="ml-2 min-w-[400px] min-h-[50px] text-black"
            />

            <Space h="md" />
            <Group position="right">
              <Tooltip
                transition="slide-up"
                transitionDuration={444}
                label="Login to Create!"
              >
                <Button
                  data-disabled
                  sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
                  onClick={(event) => event.preventDefault()}
                >
                  Create
                </Button>
              </Tooltip>
            </Group>
          </Paper>
        </Center>
      )}

      <div>
        <Space h="md" />
        {feed.map((post, index) => (
          <Paper
            m="md"
            shadow="lg"
            radius="xl"
            p="xl"
            withBorder
            className={classes.comment}
            key={index}
          >
            <Group>
              <Space w="xs" />
              <Avatar size={33} radius={33} />
              <Text weight="bold" size="sm">
                {_.get(post, "ProfileEntryResponse.Username", "anon")}
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
