import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";
import React from "react";

export const generateStaticParams = async () => {
  return DUMMY_CATEGORIES.map((category) => ({
    category: category.slug,
  }));
};

interface PageParams {
  params: {
    category: string;
  };
}

const CategoryPage = ({ params: { category } }: PageParams) => {
  const existingCategory = DUMMY_CATEGORIES.find(
    (item) => item.slug === category,
  );
  const posts = DUMMY_POSTS.filter(
    (post) => post.category.title.toLowerCase() === category,
  );

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">{existingCategory?.title}</h1>
        <p className="text-lg text-neutral-600">
          {existingCategory?.description}
        </p>
      </div>
      <PostList posts={posts} />
    </PaddingContainer>
  );
};

export default CategoryPage;
