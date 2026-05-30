import React from "react";
import Buttons from "./Buttons";
import { useBookStore } from "../hooks/useBookStore";
import type { ClubBook } from "../types";

type BookCollectionProps = {
  listName: string;
  clubId: string;
};

export default function BookCollection({
  listName,
  clubId,
}: BookCollectionProps) {
  const {
    books: bookList,
    updateBook,
    deleteBook,
    loading,
    error,
    readBooks,
  } = useBookStore(clubId);

  const [message, setMessage] = React.useState("");

  const isWantToReadList = listName === "Want To Read";
  const buttonTitle = isWantToReadList ? "Move to Read" : "Move to Want";

  const filteredBooks = bookList.filter((book) =>
    isWantToReadList ? !book.read : book.read,
  );

  const changeBookStatus = async (id: string, currentRead: boolean) => {
    try {
      const newReadValue = !currentRead;

      await updateBook(id, { read: newReadValue });

      setMessage(`Moved to ${newReadValue ? "Read Books" : "Want To Read"}`);

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBookFromDB = async (id: string, title: string) => {
    try {
      await deleteBook(id);

      setMessage(`You deleted "${title}"`);

      setTimeout(() => setMessage(""), 6000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-emerald-50">
      {message && (
        <div className="mx-auto mt-4 w-full max-w-3xl rounded-xl border border-emerald-200 bg-emerald-100 px-6 py-4 text-sm font-medium text-emerald-800 shadow-sm">
          {message}
        </div>
      )}
      {/* --------------- HEADER ----------------- */}
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-12">
        <header className="py-6 text-center">
          <h1 className="py-6 text-4xl font-bold text-emerald-600 lg:text-5xl">
            {listName} Book List
          </h1>

          {!isWantToReadList && (
            <p className="mt-3 text-sm text-gray-600 lg:text-base">
              You’ve finished{" "}
              <span className="font-semibold text-emerald-600">
                {readBooks}
              </span>{" "}
              {readBooks === 1 ? "book" : "books"}!
            </p>
          )}
        </header>
        {/* --------------- BOOK LIST ----------------- */}
        <section className="flex flex-col gap-8">
          {loading ? (
            <div className="text-center text-gray-600">Loading books...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center text-gray-600">
              No books in this list
            </div>
          ) : (
            filteredBooks.map((book: ClubBook) => (
              <article
                key={book.id}
                className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between">
                  {/* ----------- BOOK INFO ---------------*/}

                  <div className="flex flex-1 flex-col items-center gap-4 lg:flex-row lg:items-start">
                    <img
                      loading="lazy"
                      className="h-48 w-32 flex-shrink-0 rounded-xl bg-gray-100 object-contain p-2"
                      alt={book.title}
                      src={book.cover || "/images/catScream.jpg"}
                    />

                    <div className="space-y-3 text-center lg:px-6 lg:text-left">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {book.title}
                      </h2>

                      <p className="font-medium text-emerald-600">
                        {book.author}
                      </p>

                      {book.publishedDate && (
                        <p className="text-sm text-gray-500">
                          Published:{" "}
                          {new Date(book.publishedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* ------------ BOOK ACTIONS --------------- */}
                  <div className="flex flex-col items-center gap-4 lg:items-end">
                    <Buttons
                      onClick={() => changeBookStatus(book.id, book.read)}
                      title={buttonTitle}
                      disabled={false}
                    />

                    <Buttons
                      onClick={() => deleteBookFromDB(book.id, book.title)}
                      title="Delete Book"
                      disabled={false}
                    />
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
}
