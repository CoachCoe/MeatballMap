export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  link: string;
  publishedYear?: number;
  genre?: string;
  rating?: number;
  dateAdded: string;
} 