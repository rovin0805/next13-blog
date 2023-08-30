import React from "react";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/padding-container";
import PostHero from "@/components/post/post-hero";
import SocialLink from "@/components/elements/social-link";
import PostBody from "@/components/post/post-body";
import CtaCard from "@/components/elements/cta-card";
import directus from "@/lib/directus";
import { IPost } from "@/types/database";

export const generateStaticParams = async () => {
  try {
    const posts = await directus.items("post").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });
    const params = posts?.data?.map((post) => ({
      slug: post.slug as string,
    }));
    return params || [];
  } catch (error) {
    console.log(
      "🚀 ~ file: page.tsx:26 ~ generateStaticParams ~ error:",
      error,
    );
    return [];
  }
};

interface PageParams {
  params: {
    slug: string;
  };
}

async function PostPage({ params: { slug: paramsSlug } }: PageParams) {
  const SHARE_URL = process.env.NEXT_PUBLIC_SITE_URL + `/post/${paramsSlug}`;

  const getPostData = async () => {
    try {
      const post = await directus.items("post").readByQuery({
        filter: {
          slug: {
            _eq: paramsSlug,
          },
        },
        fields: [
          "*",
          "category.id",
          "category.title",
          "author.id",
          "author.first_name",
          "author.last_name",
        ],
      });
      return post?.data?.[0];
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:60 ~ getPostData ~ error:", error);
    }
  };

  const post: IPost = await getPostData();

  if (!post) {
    notFound();
  }

  return (
    <PaddingContainer>
      <div className="space-y-10">
        <PostHero post={post} />

        <div className="flex flex-col gap-10 md:flex-row">
          <div className="relative">
            <div className="sticky top-20 flex items-center gap-5 md:flex-col">
              <div className="font-medium md:hidden">Share this content:</div>
              <SocialLink
                isSharedUrl
                platform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?${SHARE_URL}`}
              />
              <SocialLink
                isSharedUrl
                platform="twitter"
                link={`https://twitter.com/intent/tweet?url=${SHARE_URL}`}
              />
              <SocialLink
                isSharedUrl
                platform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${SHARE_URL}`}
              />
            </div>
          </div>

          <PostBody body={post.body} />
        </div>

        <CtaCard />
      </div>
    </PaddingContainer>
  );
}

export default PostPage;
