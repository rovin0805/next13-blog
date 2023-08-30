import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";
import directus from "@/lib/directus";
import { IPost } from "@/types/database";
import { notFound } from "next/navigation";
import React from "react";

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
    }));
    return params || [];
  } catch (error) {
    console.log(
      "🚀 ~ file: page.tsx:23 ~ generateStaticParams ~ error:",
      error,
    );
    return [];
  }
};

interface PageParams {
  params: {
    category: string;
  };
}

interface Category {
  id: string;
  status: "published";
  title: "Cities" | "Experiences";
  slug: "cities" | "experiences";
  description: string;
  posts: IPost[];
}

const CategoryPage = async ({
  params: { category: paramsCategory },
}: PageParams) => {
  const getCategoryData = async () => {
    try {
      const categoryData = await directus.items("category").readByQuery({
        filter: {
          slug: {
            _eq: paramsCategory,
          },
        },
        fields: [
          "*",
          "posts.*",
          "posts.author.id",
          "posts.author.first_name",
          "posts.author.last_name",
          "posts.category.id",
          "posts.category.title",
        ],
      });
      return categoryData?.data?.[0];
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:23 ~ getCategoryData ~ error:", error);
    }
  };

  const category: Category = await getCategoryData();

  if (!category) {
    notFound();
  }

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">{category?.title}</h1>
        <p className="text-lg text-neutral-600">{category?.description}</p>
      </div>
      <PostList posts={category.posts} />
    </PaddingContainer>
  );
};

export default CategoryPage;
