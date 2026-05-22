import axios from 'axios';
import type { GoogleBook } from '../types';

const API_KEY = import.meta.env.VITE_GOOGLE_BOOK_API_KEY || '';
const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (
  query: string
): Promise<GoogleBook[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await axios.get(API_URL, {
      params: {
        q: query,
        key: API_KEY,
        maxResults: 20,
      },
    });

    console.log("hereeee",response)
    return response.data.items || [];
  } catch (error) {
    console.log("hereeee2",API_KEY)

    console.error('Error fetching books:', error);
    throw error;
  }
};