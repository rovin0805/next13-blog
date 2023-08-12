import { IPost } from "@/types/database";
import React from "react";
import PostCard from "./post-card";

interface IPostList {
  posts: IPost[];
  layout?: "vertical" | "horizontal";
}

function PostList({ posts, layout = "vertical" }: IPostList) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} layout={layout} />
      ))}
    </div>
  );
}

export default PostList;
