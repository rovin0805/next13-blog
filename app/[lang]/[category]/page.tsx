import { getCategoryData } from "@/apis/category";
import directus from "@/apis/directus";
import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";
import { IPost } from "@/types/database";
import { notFound } from "next/navigation";

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

export const generateMetadata = async ({
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
