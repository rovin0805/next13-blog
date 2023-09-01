import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";
import directus from "@/lib/directus";
import { IPost } from "@/types/database";
import { notFound } from "next/navigation";
import React, { cache } from "react";

interface PageParams {
  params: {
    category: string;
    lang: string;
  };
}

export const generateStaticParams = async () => {
  try {
    const categories = await directus.items("category").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = categories?.data?.map((category) => ({
      category: category.slug as string,
      lang: "en",
    }));

    const localizedParams = categories?.data?.map((category) => ({
      category: category.slug as string,
      lang: "kr",
    }));

    const allParams = params?.concat(localizedParams ?? []);

    return allParams || [];
  } catch (error) {
    console.log(
      "🚀 ~ file: page.tsx:23 ~ generateStaticParams ~ error:",
      error,
    );
    return [];
  }
};

export const getCategoryData = cache(
  async (categorySlug: string, locale: string) => {
    try {
      const categoryData = await directus.items("category").readByQuery({
        filter: {
          slug: {
            _eq: categorySlug,
          },
        },
        fields: [
          "*",
          "translations.*",
          "posts.*",
          "posts.author.id",
          "posts.author.first_name",
          "posts.author.last_name",
          "posts.category.id",
          "posts.category.title",
          "posts.translations.*",
        ],
      });

      const category = categoryData?.data?.[0];

      if (locale === "en") {
        return category;
      } else {
        const localizedCategory = {
          ...category,
          title: category.translations[0].title,
          description: category.translations[0].description,
          posts: category.posts.map((post: any) => {
            return {
              ...post,
              title: post.translations[0].title,
              description: post.translations[0].description,
              body: post.translations[0].body,
              category: {
                ...post.category,
                title: category.translations[0].title,
              },
            };
          }),
        };
        return localizedCategory;
      }
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:23 ~ getCategoryData ~ error:", error);
    }
  },
);

export const generateMetaData = async ({
  params: { lang, category },
}: PageParams) => {
  const categoryData = await getCategoryData(category, lang);
  return {
    title: categoryData?.title,
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
      siteName: categoryData?.title,
      /* images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}/opengraph-image.png`,
          width: 1200,
          height: 628,
        },
      ], */
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        "kr-KOR": `${process.env.NEXT_PUBLIC_SITE_URL}/kr/${category}`,
      },
    },
  };
};

interface Category {
  id: string;
  status: "published";
  title: "Cities" | "Experiences";
  slug: "cities" | "experiences";
  description: string;
  posts: IPost[];
}

const CategoryPage = async ({
  params: { category: paramsCategory, lang },
}: PageParams) => {
  const category: Category = await getCategoryData(paramsCategory, lang);

  if (!category) {
    notFound();
  }

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">{category?.title}</h1>
        <p className="text-lg text-neutral-600">{category?.description}</p>
      </div>
      <PostList posts={category.posts} locale={lang} />
    </PaddingContainer>
  );
};

export default CategoryPage;
