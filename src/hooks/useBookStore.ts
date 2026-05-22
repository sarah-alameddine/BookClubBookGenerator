import { useState, useEffect, useMemo, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import type { Book } from '../types';

export interface UseBooksResult {
  books: Book[];
  loading: boolean;
  error: string | null;
  addBook: (book: Omit<Book, 'id'>) => Promise<void>;
  updateBook: (id: string, updates: Partial<Omit<Book, 'id'>>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  fetchUsersSavedBooks: () => Promise<void>;
}

export const useBookStore = (): UseBooksResult => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const booksCollectionRef = useMemo(() => collection(db, 'books'), []);

  const fetchUsersSavedBooks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDocs(booksCollectionRef);
      const booksData = data.docs.map((doc) => ({
        ...(doc.data() as Omit<Book, 'id'>),
        id: doc.id,
      }));
      setBooks(booksData);
      console.log("booksData --------------",booksData)
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  }, [booksCollectionRef]);

  const addBook = useCallback(async (book: Omit<Book, 'id'>) => {
    try {
      await addDoc(booksCollectionRef, book);
      await fetchUsersSavedBooks();
    } catch (err) {
      setError('Failed to add book. Please try again.');
      console.error('Error adding book:', err);
      throw err;
    }
  }, [booksCollectionRef, fetchUsersSavedBooks]);

  const updateBook = useCallback(async (id: string, updates: Partial<Omit<Book, 'id'>>) => {
    try {
      const bookDoc = doc(db, 'books', id);
      await updateDoc(bookDoc, updates);
      await fetchUsersSavedBooks();
    } catch (err) {
      setError('Failed to update book. Please try again.');
      console.error('Error updating book:', err);
      throw err;
    }
  }, [fetchUsersSavedBooks]);

  const deleteBook = useCallback(async (id: string) => {
    try {
      const bookDoc = doc(db, 'books', id);
      await deleteDoc(bookDoc);
      await fetchUsersSavedBooks();
    } catch (err) {
      setError('Failed to delete book. Please try again.');
      console.error('Error deleting book:', err);
      throw err;
    }
  }, [fetchUsersSavedBooks]);

  useEffect(() => {
    fetchUsersSavedBooks();
  }, [fetchUsersSavedBooks]);

  return {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
    fetchUsersSavedBooks,
  };
};
