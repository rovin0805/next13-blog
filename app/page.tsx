import CtaCard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-list";
import directus from "@/lib/directus";
import { IPost } from "@/types/database";
import { notFound } from "next/navigation";

export default async function Home() {
  const getAllPosts = async (): Promise<IPost[] | null | undefined> => {
    try {
      const posts = await directus.items("post").readByQuery({
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "category.id",
          "category.title",
        ],
      });
      return posts.data;
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:23 ~ getAllPosts ~ error:", error);
    }
  };

  const post = await getAllPosts();

  if (!post) {
    notFound();
  }

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10 ">
        <PostCard post={post[0]} />

        <PostList posts={post.filter((_, index) => index > 0 && index < 3)} />

        <CtaCard />

        <PostCard post={post[3]} reverse />

        <PostList posts={post.filter((_, index) => index > 3 && index < 6)} />
      </main>
    </PaddingContainer>
  );
}
