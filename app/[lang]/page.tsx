import directus from "@/apis/directus";
import CtaCard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-list";
import { getDictionary } from "@/lib/getDictionary";
import { IPost } from "@/types/database";
import { notFound } from "next/navigation";

interface HomeParams {
  params: {
    lang: string;
  };
}

export default async function Home({ params: { lang } }: HomeParams) {
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
          "translations.*",
          "category.translations.*",
        ],
      });

      if (lang === "en") {
        return posts.data;
      } else {
        const localizedPosts = posts.data?.map((post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: post.category.translations[0].title,
            },
          };
        });
        return localizedPosts;
      }
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:23 ~ getAllPosts ~ error:", error);
    }
  };

  const post = await getAllPosts();

  if (!post) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10 ">
        <PostCard post={post[0]} locale={lang} />

        <PostList
          locale={lang}
          posts={post.filter((_, index) => index > 0 && index < 3)}
        />

        <CtaCard dictionary={dictionary} />

        <PostCard post={post[3]} reverse locale={lang} />

        <PostList
          locale={lang}
          posts={post.filter((_, index) => index > 3 && index < 6)}
        />
      </main>
    </PaddingContainer>
  );
}
