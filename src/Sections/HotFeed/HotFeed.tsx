import Deso from "deso-protocol";
import { useEffect, useState } from "react";
import { postFilter, setPostTemplate } from "../../utils";
const deso = new Deso();

export interface HotFeedProps {
  publicKey: string;
}
export const HotFeed = ({ publicKey }: HotFeedProps) => {
  const [hotFeed, setHotFeed] = useState<JSX.Element[]>([]);

  useEffect(() => {
    getHotFeed();
  }, []);

  const getHotFeed = async () => {
    const hotFeed = (
      (await deso.posts.getHotFeed({
        ResponseLimit: 100,
      })) as any
    ).data.HotFeedPage as any[];
    if (hotFeed) {
      const feed = hotFeed
        .filter(postFilter)
        .map((post) => setPostTemplate(post, post.PosterPublicKeyBase58Check));
      setHotFeed(feed);
    }
  };
  return <div>{hotFeed}</div>;
};
