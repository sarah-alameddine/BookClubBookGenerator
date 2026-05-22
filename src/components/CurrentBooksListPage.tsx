import React from "react";
import Buttons from "./Buttons";
import { useBookStore } from "../hooks/useBookStore";
import catScream from "../assets/images/catScream.jpg";
import Footer from "./Footer";
import type { Book } from "../types";

export default function CurrentBooksListPage() {
  const {
    books: bookList,
    updateBook,
    deleteBook,
    loading,
    error,
  } = useBookStore();

  const [message, setMessage] = React.useState("");

  const deleteBookFromDB = async (id: string, title: string) => {
    try {
      await deleteBook(id);

      setMessage(`You deleted "${title}"`);
      setTimeout(() => setMessage(""), 6000);
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const markBookAsRead = async (id: string) => {
    try {
      await updateBook(id, { read: true });
    } catch (error) {
      console.error("Failed to mark book as read:", error);
    }
  };

  const hasUnreadBooks = (bookList: Book[], read: boolean) => {
    return bookList.some((book) => book.read === read);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* TOP MESSAGE */}
      {message && (
        <div className="mx-auto mt-4 w-full max-w-3xl rounded-xl border border-emerald-200 bg-emerald-100 px-6 py-4 text-sm font-medium text-emerald-800 shadow-sm">
          {message}
        </div>
      )}

      {/* CONTENT */}
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-12">
        {/* HEADER */}
        <header>
          <h1 className="py-6 text-center text-4xl font-bold text-gray-900 lg:text-5xl">
            Current Book List
          </h1>
        </header>

        {/* LIST */}
        <section className="flex flex-col gap-8">
          {/* LOADING */}
          {loading ? (
            <article className="mx-auto w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-700">
                Loading books...
              </p>
              <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-3 w-2/3 animate-pulse rounded-full bg-emerald-500"></div>
              </div>
            </article>
          ) : error ? (
            <article className="mx-auto w-full max-w-3xl rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-semibold text-red-600">{error}</p>
            </article>
          ) : hasUnreadBooks(bookList, false) === false ? (
            <article className="mx-auto w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600 shadow-sm">
              No books yet! Go add your first book 😊📖
            </article>
          ) : (
            bookList
              .filter((book) => book.read === false)
              .map((book) => (
                <article
                  key={book.id}
                  className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between">
                    {/* LEFT SIDE */}
                    <div className="flex flex-1 flex-col items-center gap-4 lg:flex-row lg:items-start">
                      <img
                        className="h-48 w-auto rounded-xl bg-gray-100 p-2 object-contain"
                        alt={`${book.title} book`}
                        src={`http://books.google.com/books/content?id=${book.bookId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                      />

                      {/* TEXT */}
                      <div className="space-y-3 text-center lg:text-left lg:px-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                          {book.title}
                        </h2>

                        <p className="font-medium text-emerald-600">
                          {book.author}
                        </p>

                        {/* PUBLISHED DATE */}
                        {book.publishedDate && (
                          <p className="text-sm text-gray-500">
                            Published:{" "}
                            {new Date(book.publishedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col items-center gap-4 lg:items-end">
                      <Buttons
                        onClick={() => markBookAsRead(book.id)}
                        title="Move to read"
                        disabled={false}
                      />

                      <Buttons
                        onClick={() => deleteBookFromDB(book.id, book.title)}
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
      <Footer src={catScream} title="cat" />
    </main>
  );
}
