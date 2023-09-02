import { cache } from "react";
import directus from "./directus";

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
