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
  const posts = DUMMY_POSTS.filter(
    (post) => post.category.title.toLowerCase() === category,
  );

  return (
    <PaddingContainer>
      <PostList posts={posts} />
    </PaddingContainer>
  );
};

export default CategoryPage;
