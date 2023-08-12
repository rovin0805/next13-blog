import { getReadingTime, getRelativeTime } from "@/lib/helper";
import { IPost } from "@/types/database";
import { ArrowRight } from "lucide-react";
import React from "react";

const PostContent = ({ post }: { post: IPost }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-neutral-400 @md:text-sm">
        <div
          className={`font-medium ${
            post.category.title === "Cities"
              ? "text-emerald-600"
              : "text-indigo-600"
          }`}
        >
          {post.category.title}
        </div>
        <div className="h-2 w-2 rounded-full bg-neutral-200" />
        <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
        <div className="h-2 w-2 rounded-full bg-neutral-200" />
        <div>{getReadingTime(post.body)} min</div>
        <div className="h-2 w-2 rounded-full bg-neutral-200" />
        <div>{getRelativeTime(post.date_created)}</div>
      </div>

      <h2 className="@lg:text-3 xl text-xl font-medium @md:text-2xl">
        {post.title}
      </h2>
      <p className="text-base leading-snug text-neutral-600 @lg:text-lg">
        {post.description}
      </p>

      <div className="flex items-center gap-2 pt-3">
        Read More <ArrowRight size="14" />
      </div>
    </div>
  );
};

export default PostContent;
