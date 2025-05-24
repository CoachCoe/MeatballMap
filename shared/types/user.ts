export interface UserProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  photoUrl: string | null;
  favoriteBooks: string[]; // Book IDs
} 