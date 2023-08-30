import { IPost } from "@/types/database";
import React from "react";
import PostContent from "./post-content";
import Image from "next/image";

function PostHero({ post }: { post: IPost }) {
  return (
    <div>
      <PostContent post={post} isPostPage />
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${post.image}?key=optimizer`}
        width={1200}
        height={500}
        className="mt-6 h-[300px] rounded-md object-cover object-center md:h-[500px]"
        alt={post.title}
      />
    </div>
  );
}

export default PostHero;
