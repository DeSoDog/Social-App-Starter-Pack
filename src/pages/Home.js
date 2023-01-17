import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { PublicKey } from "../State/App.state";
import { useRecoilValue } from "recoil";
import { Button, Space, TextInput, Paper, Center } from "@mantine/core";
const deso = new Deso();

export default function Home() {
  const [post, setPost] = useState("");
  const [feed, setFeed] = useState([]);
  const publicKey = useRecoilValue(PublicKey);

  useEffect(() => {}, [post, setPost]);
  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFeed = async () => {
    const request = {
      PublicKeyBase58Check: publicKey,
      ReaderPublicKeyBase58Check: publicKey,
      NumToFetch: 5,
    };

    const response = await deso.posts.getPostsStateless(request);
    if (!response) {
      console.log("No response from the server");
    }
    console.log(response);
    setFeed(response);
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
                  UpdaterPublicKeyBase58Check: deso.identity.getUserKey(),
                  BodyObj: {
                    Body: post,
                    VideoURLs: [],
                    ImageURLs: [],
                  },
                });
                setPost("");
              }}
            >
              Create{" "}
            </Button>
          </div>
        </Paper>
      </Center>
      {publicKey ? (
        <div>
          {feed.map((post, index) => {
            return (
              <div key={index}>
                <p>{post.Body}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>hey</div>
      )}
    </>
  );
}
