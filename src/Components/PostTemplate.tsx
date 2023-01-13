import Deso from "deso-protocol";
import { PostEntryResponse } from "deso-protocol-types";
import { useEffect, useState } from "react";
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
} from "@mantine/core";
import { IconHeart, IconDiamond, IconRecycle } from "@tabler/icons";
const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

export interface PostTemplateProps {
  post: PostEntryResponse;
  publicKey: string;
}
const deso = new Deso();
export const PostsTemplate = ({ post, publicKey }: PostTemplateProps) => {
  const [username, setUsername] = useState("");
  const [pic, setProfilePic] = useState("");
  const { classes } = useStyles();

  useEffect(() => {
    getUsername();
  });

  const getUsername = async () => {
    const response = await deso.user.getSingleProfile({
      PublicKeyBase58Check: publicKey,
    });

    const profilePic = deso.user.getSingleProfilePicture(publicKey);
    setUsername(response.Profile?.Username as string);
    setProfilePic(profilePic);
  };

  return (
    <Paper
      m="md"
      shadow="lg"
      radius="xl"
      p="xl"
      withBorder
      className={classes.comment}
    >
      <Group>
        <Space w="xs" />
        <Avatar size={33} radius={33} src={pic} />
        <Text weight="bold" size="sm">
          {username}
        </Text>
      </Group>
      <Center>
        <TypographyStylesProvider className={classes.body}>
          <Text size="md">{post.Body}</Text>
        </TypographyStylesProvider>
      </Center>
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
      </Center>
    </Paper>
  );
};
