import { useState, useEffect, useMemo } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../services/firebase";
import type { ClubBook } from "../types";

export interface UseBooksResult {
  books: ClubBook[];
  loading: boolean;
  error: string | null;
  addBook: (book: Omit<ClubBook, "id">) => Promise<void>;
  updateBook: (
    id: string,
    updates: Partial<Omit<ClubBook, "id">>,
  ) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  readBooks: number;
}

export function useBookStore(clubId: string): UseBooksResult {
  const [books, setBooks] = useState<ClubBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const readBooks = useMemo(
    () => books.filter((book) => book.read).length,
    [books],
  );

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);

        const ref = collection(db, "clubs", clubId, "books");
        const data = await getDocs(ref);

        const booksData: ClubBook[] = data.docs.map((docItem) => ({
          ...(docItem.data() as Omit<ClubBook, "id">),
          id: docItem.id,
        }));

        setBooks(booksData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    }

    if (clubId) fetchBooks();
  }, [clubId]);

  async function refreshBooks() {
    const ref = collection(db, "clubs", clubId, "books");
    const data = await getDocs(ref);

    setBooks(
      data.docs.map((docItem) => ({
        ...(docItem.data() as Omit<ClubBook, "id">),
        id: docItem.id,
      })),
    );
  }

  async function addBook(book: Omit<ClubBook, "id">) {
    const ref = collection(db, "clubs", clubId, "books");

    await addDoc(ref, {
      ...book,
      cover: book.cover || "",
    });

    await refreshBooks();
  }

  async function updateBook(
    id: string,
    updates: Partial<Omit<ClubBook, "id">>,
  ) {
    const ref = doc(db, "clubs", clubId, "books", id);

    await updateDoc(ref, updates);
    await refreshBooks();
  }

  async function deleteBook(id: string) {
    const ref = doc(db, "clubs", clubId, "books", id);

    await deleteDoc(ref);
    await refreshBooks();
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
