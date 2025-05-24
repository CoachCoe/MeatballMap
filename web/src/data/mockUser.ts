import { Book } from './mockBooks';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  photoUrl: string | null;
  favoriteBooks: string[]; // Book IDs
}

export const mockUserProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  location: 'San Francisco, CA',
  photoUrl: null,
  favoriteBooks: [] // Empty favorites list
}; 