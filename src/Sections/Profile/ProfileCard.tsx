import Deso from "deso-protocol";

import {
  GetSingleProfileResponse,
  // PostEntryResponse,
  GetFollowsResponse,
} from "deso-protocol-types";
import { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import { ProfilePic } from "../../Components/ProfilePic";
// import {ProfilePic} from

const deso = new Deso();
export interface ProfileCardProps {
  publicKey: string;
}
export const ProfileCard = ({ publicKey }: ProfileCardProps) => {
  useEffect(() => {
    getProfile(publicKey);
  }, []);

  const [profilePic, setProfilePic] = useState("");
  const [profile, setProfile] = useState<null | GetSingleProfileResponse>(null);
  const [followerInfo, setFollowers] = useState<null | FollowerInfo>(null);

  const getProfile = async (user: string) => {
    const profile = await deso.user.getSingleProfile({
      PublicKeyBase58Check: user,
    });

    const followers = await deso.social.getFollowsStateless({
      PublicKeyBase58Check: deso.identity.getUserKey() as string,
      GetEntriesFollowingUsername: true,
    });
    const following = await deso.social.getFollowsStateless({
      PublicKeyBase58Check: deso.identity.getUserKey() as string,
    });

    // setPosts(posts.Posts ?? []);
    setProfile(profile);
    setProfilePic(profilePic);
    setFollowers({ following, followers });
  };

  return (
    <div className="flex flex-col bg-slate-500 p-2 text-white rounded-lg">
      <div className="min-w-[1000px]  px-6 mx-auto">
        <div className="flex text-lg font-bold ">
          <ProfilePic publicKey={publicKey as string} />
          <div className="my-auto">
            {profile?.Profile?.Username && "@" + profile?.Profile?.Username}
          </div>
        </div>
        <div> {profile?.Profile?.Description} </div>
        {followerInfo && (
          <FollowerDisplay
            followers={followerInfo.followers}
            following={followerInfo.following}
          />
        )}
      </div>
    </div>
  );
};

const FollowerDisplay = ({ followers, following }: FollowerInfo) => {
  const [post, setPost] = useState("");
  useEffect(() => {}, [post, setPost]);
  return (
    <>
      <div className="flex justify-center font-semibold ">
        <div className="mr-2">
          {followers && `following: ${following.NumFollowers}`}
        </div>
        <div>{followers && `followers: ${followers.NumFollowers}`}</div>
      </div>

      <div className="flex flex-col justify-center py-2">
        <div className="flex justify-center">
          <textarea
            placeholder="Following along with @TyFischer at the MLH workshop!"
            value={post}
            onChange={(e: any) => {
              setPost(e.target.value);
            }}
            className="ml-2 min-w-[400px] min-h-[50px] text-black"
          />
        </div>

        <div className="flex justify-center">
          <Button
            buttonText="Create A Post"
            click={async () => {
              console.log(post);
              if (!post) {
                return;
              }
              await deso.posts.submitPost({
                UpdaterPublicKeyBase58Check:
                  deso.identity.getUserKey() as string,
                BodyObj: {
                  Body: post,
                  VideoURLs: [],
                  ImageURLs: [],
                },
              });
              setPost("");
            }}
          />
        </div>
      </div>
    </>
  );
};
type FollowerInfo = {
  followers: GetFollowsResponse;
  following: GetFollowsResponse;
};
