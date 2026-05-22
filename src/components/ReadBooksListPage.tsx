import Buttons from "./Buttons";
import { useBookStore } from "../hooks/useBookStore";
import type { Book } from "../types";
import cat from "../assets/images/cat.jpg";
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

  const readBooks = bookList.filter((book) => book.read === true);
  const readCount = readBooks.length;

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* CONTENT */}
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-12">
        {/* HEADER */}
        <header className="py-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Read Book List
          </h1>

          <p className="mt-3 text-gray-600 text-sm lg:text-base">
            You’ve finished{" "}
            <span className="font-semibold text-emerald-600">{readCount}</span>{" "}
            {readCount === 1 ? "book" : "books"}!
          </p>
        </header>

        {/* BOOK LIST */}
        <section className="flex flex-col gap-8">
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
              <p className="mt-2 text-sm text-gray-500">
                Please refresh the page.
              </p>
            </article>
          ) : checkIfListhasReadBooks(bookList, true) === false ? (
            <article className="mx-auto w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600 shadow-sm">
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
                  <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between">
                    {/* LEFT SIDE */}
                    <div className="flex flex-1 flex-col items-center gap-4 lg:flex-row lg:items-start">
                      <img
                        className="h-48 w-auto rounded-xl bg-gray-100 p-2 object-contain"
                        alt={book.title}
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

                        {/* OPTIONAL PUBLISHED DATE */}
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
      <Footer src={cat} title="cat" />
    </main>
  );
}
