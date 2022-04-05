import { PostsTemplate } from "./Components/PostTemplate";

export const postFilter = (post: any) => {
  if (!post.Body) {
    return false;
  }
  if (post.ParentPosts) {
    return false;
  }
  return true;
};
export const setPostTemplate = (post: any, publicKey: string) => {
  return <PostsTemplate publicKey={publicKey} post={post} />;
};
