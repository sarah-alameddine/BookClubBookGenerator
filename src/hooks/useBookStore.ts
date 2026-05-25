import { useState, useEffect, useMemo } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase-config";
import type { Book } from "../types";

export interface UseBooksResult {
  books: Book[];
  loading: boolean;
  error: string | null;

  addBook: (book: Omit<Book, "id">) => Promise<void>;

  updateBook: (id: string, updates: Partial<Omit<Book, "id">>) => Promise<void>;

  deleteBook: (id: string) => Promise<void>;
  readBooks: number;
}

export function useBookStore(): UseBooksResult {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const readBooks = useMemo(() => {
    const result = books.filter((book) => book.read === true);
    return result.length;
  }, [books]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);

        const booksCollectionRef = collection(db, "books");

        const data = await getDocs(booksCollectionRef);

        const booksData: Book[] = data.docs.map((docItem) => ({
          ...(docItem.data() as Omit<Book, "id">),
          id: docItem.id,
        }));

        setBooks(booksData);

        setError(null);
      } catch (err) {
        console.error(err);

        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  async function refreshBooks() {
    const booksCollectionRef = collection(db, "books");

    const data = await getDocs(booksCollectionRef);

    const booksData: Book[] = data.docs.map((docItem) => ({
      ...(docItem.data() as Omit<Book, "id">),
      id: docItem.id,
    }));

    setBooks(booksData);
  }

  async function addBook(book: Omit<Book, "id">) {
    try {
      const booksCollectionRef = collection(db, "books");

      await addDoc(booksCollectionRef, book);

      await refreshBooks();
    } catch (err) {
      console.error(err);

      setError("Failed to add book.");

      throw err;
    }
  }

  async function updateBook(id: string, updates: Partial<Omit<Book, "id">>) {
    try {
      const bookDoc = doc(db, "books", id);

      await updateDoc(bookDoc, updates);

      await refreshBooks();
    } catch (err) {
      console.error(err);

      setError("Failed to update book.");

      throw err;
    }
  }

  async function deleteBook(id: string) {
    try {
      const bookDoc = doc(db, "books", id);

      await deleteDoc(bookDoc);

      await refreshBooks();
    } catch (err) {
      console.error(err);

      setError("Failed to delete book.");

      throw err;
    }
  }

  return {
    books,
    loading,
    error,
    addBook,
    updateBook,
    deleteBook,
    readBooks,
  };
}
