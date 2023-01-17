import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { Button, Space, TextInput, Paper, Center } from "@mantine/core";
const deso = new Deso();

export default function Home() {
  const [post, setPost] = useState("");
  useEffect(() => {}, [post, setPost]);

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
    </>
  );
}
