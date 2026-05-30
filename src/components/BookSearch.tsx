import React, { useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { searchBooks } from "../services/searchBooks";
import { useBookStore } from "../hooks/useBookStore";
import type { OpenLibraryBookRaw } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import BookCard from "./BookCard";
import UseClub from "@/hooks/useClub";

const ITEMS_PER_PAGE = 10;

const BookSearch = () => {
  const [searchResults, setSearchResults] = useState<OpenLibraryBookRaw[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addedBookId, setAddedBookId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { clubId } = UseClub();

  const { books: savedBooks, addBook } = useBookStore(clubId);

  const lastQueryRef = useRef("");
  const cacheRef = useRef<Record<string, OpenLibraryBookRaw[]>>({});

  const runSearch = async (value: string) => {
    try {
      setLoading(true);

      if (cacheRef.current[value]) {
        setSearchResults(cacheRef.current[value]);
        setPage(1);
        return;
      }

      const results = await searchBooks(value);

      cacheRef.current[value] = results;
      setSearchResults(results);
      setPage(1);
    } catch (err) {
      setError("Failed to search books. Please try again.");
      console.error(err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(runSearch, 300);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    setError(null);

    if (value.length < 3) {
      setSearchResults([]);
      setPage(1);
      setLoading(false);
      return;
    }

    if (lastQueryRef.current === value) return;

    lastQueryRef.current = value;
    setSearched(true);

    debouncedSearch(value);
  };

  const isBookAdded = (id: string) =>
    savedBooks.some((book) => book.bookId === id);

  const totalPages = Math.max(
    1,
    Math.ceil(searchResults.length / ITEMS_PER_PAGE),
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const paginatedResults = searchResults.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleAddBook = async (book: OpenLibraryBookRaw) => {
    await addBook({
      title: book.title,
      author: book.author_name?.join(", ") || "Unknown",
      bookId: book.key,
      publishedDate: book.first_publish_year?.toString() || "",
      read: false,
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "",
    });

    setAddedBookId(book.key);
    setTimeout(() => setAddedBookId(null), 2500);
  };

  return (
    <main className="flex min-h-screen flex-col bg-emerald-50">
      <div className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-12">
          <header className="mb-10 text-center">
            <h1 className="text-5xl font-bold text-emerald-600 lg:text-6xl">
              Add Books!
            </h1>
          </header>

          <section className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <SearchBar
                placeholder="What do you want to read?"
                onChange={onInputChange}
              />
            </div>

            <section className="mt-10 flex w-full flex-col gap-6">
              {loading ? (
                <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-500" />
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : searched && searchResults.length === 0 ? (
                <p className="text-center text-gray-600">No books found.</p>
              ) : searchResults.length === 0 ? (
                <p className="text-center text-gray-600">
                  Search for books to add to your list.
                </p>
              ) : (
                <>
                  <ul className="flex flex-col gap-6">
                    {paginatedResults.map((book) => (
                      <BookCard
                        key={book.key}
                        book={book}
                        alreadyAdded={isBookAdded(book.key)}
                        addedBookId={addedBookId}
                        onAdd={handleAddBook}
                      />
                    ))}
                  </ul>

                  {searchResults.length > ITEMS_PER_PAGE && (
                    <div className="flex items-center justify-center gap-4 pt-6">
                      <button
                        className="rounded-lg bg-gray-200 px-4 py-2 disabled:opacity-40"
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                      >
                        Prev
                      </button>

                      <span className="text-gray-700">
                        Page {page} of {totalPages}
                      </span>

                      <button
                        className="rounded-lg bg-emerald-500 px-4 py-2 text-white disabled:opacity-40"
                        onClick={() =>
                          setPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={page === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </section>
        </section>
      </div>
    </main>
  );
};

export default BookSearch;
