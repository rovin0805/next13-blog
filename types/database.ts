export interface IPost {
  id: string;
  title: string;
  description: string;
  category: ICategory;
  author: IAuthor;
  slug: string;
  image: string;
  body: string;
  date_created: string;
  date_updated: string;
}

interface IAuthor {
  id: string;
  first_name: string;
  last_name: string;
}

export interface ICategory {
  id: string;
  title: string;
  slug?: string;
  description?: string;
}
