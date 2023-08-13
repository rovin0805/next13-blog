import { IPost } from "@/types/database";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PostContent from "./post-content";

interface IPostCard {
  post: IPost;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
}

function PostCard({ post, layout = "horizontal", reverse = false }: IPostCard) {
  return (
    <Link href={`/post/${post.slug}`}>
      <div
        className={`${
          layout === "horizontal"
            ? "grid grid-cols-1 items-center gap-10 md:grid-cols-2"
            : "space-y-10"
        } ${reverse ? "mt-10" : ""}`}
      >
        <Image
          src={post.image}
          width={600}
          height={300}
          alt={post.title}
          className={`h-full max-h-[300px] w-full rounded-md object-cover object-center
             ${reverse ? "md:order-last" : ""} 
          `}
        />
        <PostContent post={post} />
      </div>
    </Link>
  );
}

export default PostCard;
