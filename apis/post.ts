import { cache } from "react";
import directus from "./directus";

export const getPostData = cache(async (paramsSlug: string, locale: string) => {
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
        "auhtor.id",
        "author.first_name",
        "author.last_name",
        "translations.*",
        "category.translations.*",
      ],
    });

    const postData = post?.data?.[0];

    if (locale === "en") {
      return postData;
    } else {
      const localizedPostData = {
        ...postData,
        title: postData?.translations?.[0]?.title,
        description: postData?.translations?.[0]?.description,
        body: postData?.translations?.[0]?.body,
        category: {
          ...postData?.category,
          title: postData?.category?.translations?.[0]?.title,
        },
      };

      return localizedPostData;
    }
  } catch (error) {
    console.log("🚀 ~ file: page.tsx:60 ~ getPostData ~ error:", error);
  }
});
