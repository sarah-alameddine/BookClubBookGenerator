import React, { useRef, useState } from "react";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons";
import { searchBooks } from "../services/googleBooks";
import { useBookStore } from "../hooks/useBookStore";
import type { GoogleBook } from "../types";
import catPlay from "../assets/images/catPlay.jpg";
import { useDebounce } from "../hooks/useDebounce";
import Footer from "./Footer";

const ITEMS_PER_PAGE = 10;

const BookSearchPage = () => {
  const [searchResults, setSearchResults] = useState<GoogleBook[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addedBookId, setAddedBookId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { books: savedBooks, addBook } = useBookStore();

  const lastQueryRef = useRef("");
  const cacheRef = useRef<Record<string, GoogleBook[]>>({});

  // reset page on new search
  const runSearch = async (value: string) => {
    try {
      if (cacheRef.current[value]) {
        setSearchResults(cacheRef.current[value]);
        setLoading(false);
        return;
      }

      const results = await searchBooks(value);

      cacheRef.current[value] = results;
      setSearchResults(results);
      setPage(1); // RESET PAGINATION ON NEW SEARCH
    } catch (err) {
      setError("Failed to search books. Please try again.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(runSearch, 900);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    setError(null);

    if (value.length < 3) {
      setSearchResults([]);
      setPage(1);
      return;
    }

    if (lastQueryRef.current === value) return;
    lastQueryRef.current = value;

    setSearched(true);
    setLoading(true);

    debouncedSearch(value);
  };

  const bookAuthors = (authors: string[] | undefined) =>
    authors ? authors.join(", ") : "Unknown";

  const isBookAdded = (googleBookId: string) =>
    savedBooks.some((book) => book.bookId === googleBookId);

  // 📌 PAGINATION LOGIC
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedResults = searchResults.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-12">

          {/* HEADER */}
          <header className="mb-10 text-center">
            <h1 className="text-5xl font-bold text-emerald-700 lg:text-6xl">
              Add Books!
            </h1>
          </header>

          {/* SEARCH */}
          <section className="flex flex-col items-center">

            <div className="w-full max-w-2xl">
              <SearchBar
                placeholder="What do you want to read?"
                onChange={onInputChange}
              />
            </div>

            {/* RESULTS */}
            <section className="mt-10 flex w-full flex-col gap-6">

              {loading ? (
                <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-500" />
              ) : error ? (
                <p className="text-red-600 text-center">{error}</p>
              ) : paginatedResults.length === 0 ? (
                <p className="text-center text-gray-600">
                  {searched
                    ? "No books found."
                    : "Search for books to add to your list."}
                </p>
              ) : (
                <>
                  {/* BOOK LIST */}
                  <ul className="flex flex-col gap-6">
                    {paginatedResults.map((book) => {
                      const alreadyAdded = isBookAdded(book.id);

                      return (
                        <li key={book.id}>
                          <article className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                              <div className="flex flex-1 flex-col items-center gap-4 text-center lg:flex-row lg:text-left">

                                <img
                                  className="h-48 w-auto rounded-xl bg-gray-100 p-2 object-contain"
                                  alt={book.volumeInfo.title}
                                  src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                />

                                <div className="space-y-3 lg:px-6">
                                  <h2 className="text-2xl font-semibold text-gray-900">
                                    {book.volumeInfo.title}
                                  </h2>

                                  <p className="text-emerald-600 font-medium">
                                    {bookAuthors(book.volumeInfo.authors)}
                                  </p>

                                  <p className="text-sm text-gray-500">
                                    {book.volumeInfo.publishedDate}
                                  </p>
                                </div>
                              </div>

                              <Buttons
                                onClick={async () => {
                                  await addBook({
                                    title: book.volumeInfo.title,
                                    author: bookAuthors(book.volumeInfo.authors),
                                    bookId: book.id,
                                    read: false,
                                  });

                                  setAddedBookId(book.id);
                                  setTimeout(() => setAddedBookId(null), 2500);
                                }}
                                title={alreadyAdded ? "Already Added" : "Add Book"}
                                disabled={alreadyAdded}
                              />
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ul>

                  {/* PAGINATION CONTROLS */}
                  <div className="flex items-center justify-center gap-4 pt-6">

                    <button
                      className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page === 1}
                    >
                      Prev
                    </button>

                    <span className="text-gray-700">
                      Page {page} of {totalPages}
                    </span>

                    <button
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg disabled:opacity-40"
                      onClick={() =>
                        setPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={page === totalPages}
                    >
                      Next
                    </button>

                  </div>
                </>
              )}
            </section>
          </section>
        </section>
      </div>

      <Footer src={catPlay} title="cat" />
    </main>
  );
};

export default BookSearchPage;