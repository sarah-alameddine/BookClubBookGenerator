import type { OpenLibraryBookRaw } from "../types";

export async function searchBooks(
  query: string,
): Promise<OpenLibraryBookRaw[]> {
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query,
    )}&limit=30`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`OpenLibrary API error: ${response.status}`);
    }

    const data = await response.json();

    const books: OpenLibraryBookRaw[] = (data.docs || []).map((book) => {
      return {
        key: book.key,
        title: book.title,
        author_name: book.author_name || [],
        first_publish_year: book.first_publish_year,
        cover_i: book.cover_i,
      };
    });

    return books.filter(
      (book) => book.title && book.author_name && book.author_name.length > 0,
    );
  } catch (error) {
    console.error("OpenLibrary API Error:", error);
    return [];
  }
}
