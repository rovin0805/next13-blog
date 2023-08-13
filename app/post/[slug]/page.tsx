import React from "react";
import { DUMMY_POSTS } from "@/DUMMY_DATA";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/padding-container";
import PostHero from "@/components/post/post-hero";
import SocialLink from "@/components/elements/social-link";
import PostBody from "@/components/post/post-body";
import CtaCard from "@/components/elements/cta-card";

export const generateStaticParams = async () => {
  return DUMMY_POSTS.map((post) => ({
    slug: post.slug,
  }));
};

interface PageParams {
  params: {
    slug: string;
  };
}

function Page({ params: { slug } }: PageParams) {
  const SHARE_URL = process.env.NEXT_PUBLIC_SITE_URL + `/post/${slug}`;
  const post = DUMMY_POSTS.find((post) => post.slug === slug);

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

export default Page;
