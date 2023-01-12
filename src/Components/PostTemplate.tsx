import Deso from "deso-protocol";
import { PostEntryResponse } from "deso-protocol-types";
import { useEffect, useState } from "react";
import { ProfilePic } from "../Components/ProfilePic";
import { Avatar } from "@mantine/core";
export interface PostTemplateProps {
  post: PostEntryResponse;
  publicKey: string;
}
const deso = new Deso();
export const PostsTemplate = ({ post, publicKey }: PostTemplateProps) => {
  const [username, setUsername] = useState("");
  const [pic, setProfilePic] = useState("");
  useEffect(() => {
    getUsername();
  });
  const getUsername = async () => {
    const response = await deso.user.getSingleProfile({
      PublicKeyBase58Check: publicKey,
    });
    const profilePic = await deso.user.getSingleProfilePicture(publicKey);
    setUsername(response.Profile?.Username as string);
    setProfilePic(profilePic);
  };
  return (
    <div className="border-gray-300 mb-4 rounded-lg border p-6 pb-2 min-w-[1000px] max-w-[1000px]">
      <div className="flex">
        <Avatar variant="gradient" size={77} radius={77} mx="auto" src={pic} />
        <div className="my-auto font-semibold">@{username}</div>
      </div>
      <div className="ml-12">{post.Body}</div>
      <div className="flex justify-around px-40">
        <div className="pt-4">Likes: {post.LikeCount}</div>
        <div className="pt-4">Reposts: {post.RepostCount}</div>
        <div className="pt-4">Diamonds: {post.DiamondCount}</div>
      </div>
    </div>
  );
};
