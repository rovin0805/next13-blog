import { IPost } from "@/types/database";
import React from "react";
import PostCard from "./post-card";

interface IPostList {
  posts: IPost[];
  layout?: "vertical" | "horizontal";
  locale: string;
}

function PostList({ posts, layout = "vertical", locale }: IPostList) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} layout={layout} locale={locale} />
      ))}
    </div>
  );
}

export default PostList;
