import Buttons from "./Buttons";
import { useBookStore } from "../hooks/useBookStore";
import { Link } from "react-router-dom";
import type { Book } from "../types";
import catHowl from "../assets/images/catHowl.jpg";
import Footer from "./Footer";

export default function ReadBooksListPage() {
  const {
    books: bookList,
    updateBook,
    deleteBook,
    loading,
    error,
  } = useBookStore();

  const deleteBookFromDB = async (id: string) => {
    try {
      await deleteBook(id);
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const markBookAsUnread = async (id: string) => {
    try {
      await updateBook(id, { read: false });
    } catch (error) {
      console.error("Failed to mark book as unread:", error);
    }
  };

  const checkIfListhasReadBooks = (bookList: Book[], read: boolean) => {
    return bookList.some((book) => book.read === read);
  };

  // ✅ NEW: read books count
  const readBooks = bookList.filter((book) => book.read === true);
  const readCount = readBooks.length;

  return (
    <main className="min-h-screen flex flex-col w-full bg-gray-50">
      {/* MAIN CONTENT */}
      <section className="flex-1 mx-auto w-full max-w-5xl px-6 pb-12 flex flex-col gap-10">
        {/* HEADER */}
        <header className="text-center py-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Read Book List
          </h1>

          {/* ✅ NEW: message under title */}
          <p className="mt-3 text-gray-600 text-sm lg:text-base">
            You’ve finished{" "}
            <span className="font-semibold text-emerald-600">{readCount}</span>{" "}
            {readCount === 1 ? "book" : "books"}!
          </p>
        </header>

        {/* BOOKS */}
        <section className="flex flex-col gap-8">
          {loading ? (
            <article className="mx-auto w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
              <p className="text-xl font-semibold text-gray-800">
                Loading books...
              </p>

              <div className="w-full bg-gray-200 rounded-full h-3 mt-6 overflow-hidden">
                <div className="bg-blue-600 h-3 w-2/3 animate-pulse"></div>
              </div>
            </article>
          ) : error ? (
            <article className="mx-auto w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-red-200 p-10 text-center">
              <p className="text-xl font-semibold text-red-600">{error}</p>
              <p className="mt-2 text-sm text-gray-500">
                Please refresh the page.
              </p>
            </article>
          ) : checkIfListhasReadBooks(bookList, true) === false ? (
            <article className="mx-auto w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center text-gray-700">
              No books here yet 😓. Add a book to get started!
            </article>
          ) : (
            bookList
              .filter((book) => book.read === true)
              .map((book) => (
                <article
                  key={book.id}
                  className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                    {/* BOOK INFO */}
                    <div className="flex flex-col lg:flex-row gap-4 flex-1">
                      <img
                        className="h-48 w-auto rounded-xl object-contain bg-gray-100 p-2"
                        alt={book.title}
                        src={`http://books.google.com/books/content?id=${book.bookId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                      />

                      <div className="space-y-3 lg:px-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                          {book.title}
                        </h2>

                        <p className="text-blue-600 font-medium">
                          {book.author}
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col gap-4 items-center lg:items-end">
                      <Buttons
                        onClick={() => markBookAsUnread(book.id)}
                        title="Move to current"
                        disabled={false}
                      />

                      <Buttons
                        onClick={() => deleteBookFromDB(book.id)}
                        title="Delete book"
                        disabled={false}
                      />
                    </div>
                  </div>
                </article>
              ))
          )}
        </section>
      </section>

      {/* FOOTER */}
      <Footer src={catHowl} title="cat" />
    </main>
  );
}
