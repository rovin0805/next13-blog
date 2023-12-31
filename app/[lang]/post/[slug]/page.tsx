import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/padding-container";
import PostHero from "@/components/post/post-hero";
import SocialLink from "@/components/elements/social-link";
import PostBody from "@/components/post/post-body";
import CtaCard from "@/components/elements/cta-card";
import { IPost } from "@/types/database";
import siteConfig from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import { getPostData } from "@/apis/post";
import directus from "@/apis/directus";

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

    const localizedParams = posts?.data?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "kr",
      };
    });

    const allParams = params?.concat(localizedParams ?? []);

    return allParams || [];
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
    lang: string;
  };
}

export const generateMetadata = async ({
  params: { lang, slug },
}: PageParams) => {
  const post = await getPostData(slug, lang);
  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
      siteName: post?.title,
      /* images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}/opengraph-image.png`,
          width: 1200,
          height: 628,
        },
      ], */
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
        "kr-KOR": `${process.env.NEXT_PUBLIC_SITE_URL}/kr/post/${slug}`,
      },
    },
  };
};

async function PostPage({ params: { slug: paramsSlug, lang } }: PageParams) {
  const SHARE_URL = process.env.NEXT_PUBLIC_SITE_URL + `/post/${paramsSlug}`;

  const post: IPost = await getPostData(paramsSlug, lang);

  if (!post) {
    notFound();
  }

  /* Structured Data for Google */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${paramsSlug}/opengraph-image.png`,
    author: post.author.first_name + " " + post.author.last_name,
    genre: post.category.title,
    publisher: siteConfig.siteName,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${paramsSlug}`,
    datePublished: new Date(post.date_created).toISOString(),
    dateCreated: new Date(post.date_created).toISOString(),
    dateModified: new Date(post.date_updated).toISOString(),
    description: post.description,
    articleBody: post.body,
  };

  const dictionary = await getDictionary(lang);

  return (
    <PaddingContainer>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-10">
        <PostHero post={post} locale={lang} />

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

        <CtaCard dictionary={dictionary} />
      </div>
    </PaddingContainer>
  );
}

export default PostPage;
