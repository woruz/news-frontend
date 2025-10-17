export interface Author {
  name: string;
  avatar?: string;
}

export type Category = "Politics" | "Technology" | "Sports" | "Business" | "Entertainment";

export interface Article {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: Author;
  publishedAt: string;
  imageUrl: string;
  tags?: string[];
  readingTime?: number;
}