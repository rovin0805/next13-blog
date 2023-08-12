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
    <Link
      href={`/post/${post.slug}`}
      // className="gird grid-cols-2 gap-10"
      className={`${
        layout === "horizontal" ? "flex items-center space-x-10" : "space-y-10"
      }`}
    >
      <div className={`flex-1 ${reverse ? "order-last" : ""}`}>
        <Image
          src={post.image}
          width={600}
          height={300}
          alt={post.title}
          className="max-h-[300px] w-full rounded-md object-cover object-center"
        />
      </div>
      <div className="flex-1">
        <PostContent post={post} />
      </div>
    </Link>
  );
}

export default PostCard;
