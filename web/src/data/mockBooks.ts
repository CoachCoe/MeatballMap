export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  description: string;
  buyLink: string;
  publishedYear: number;
  rating: number;
}

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    buyLink: 'https://www.amazon.com/Midnight-Library-Matt-Haig/dp/0525559477',
    publishedYear: 2020,
    rating: 4.5
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish.',
    buyLink: 'https://www.amazon.com/Project-Hail-Mary-Andy-Weir/dp/0593135202',
    publishedYear: 2021,
    rating: 4.8
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
    buyLink: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
    publishedYear: 2018,
    rating: 4.7
  },
  {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
    buyLink: 'https://www.amazon.com/Dune-Frank-Herbert/dp/0441172717',
    publishedYear: 1965,
    rating: 4.6
  },
  {
    id: '5',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    genre: 'Finance',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg',
    description: "Timeless lessons on wealth, greed, and happiness doing well with money isn't necessarily about what you know.",
    buyLink: 'https://www.amazon.com/Psychology-Money-Timeless-Lessons-Happiness/dp/0857197681',
    publishedYear: 2020,
    rating: 4.7
  }
]; 