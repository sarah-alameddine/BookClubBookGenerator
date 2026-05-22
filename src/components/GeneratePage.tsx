import React, { useState } from "react";

import MainText from "./MainText";
import Buttons from "./Buttons";
import { useBookStore } from "../hooks/useBookStore";
import type { Book } from "../types";
import cat from "../assets/images/cat.jpg";
import Footer from "./Footer";

function GeneratePage() {
  const [users, setUsers] = useState<Book>({
    author: "",
    bookId: "",
    publishedDate: "",
    read: false,
    title: "",
    id: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const { books: booksInDB } = useBookStore();

  const goodreadsLink = users.title
    ? `https://www.goodreads.com/search?q=${encodeURIComponent(
        users.title + " " + users.author
      )}`
    : "#";

  function getRandomItem(books: Book[]) {
    setHasGenerated(true);
    setIsGenerating(true);

    setUsers({
      author: "",
      bookId: "",
      publishedDate: "",
      read: false,
      title: "",
      id: "",
    });

    const unreadItems = books.filter((book) => !book.read);

    if (unreadItems.length === 0) {
      setIsGenerating(false);
      return;
    }

    setTimeout(() => {
      const random =
        unreadItems[Math.floor(Math.random() * unreadItems.length)];

      if (!random) {
        setIsGenerating(false);
        return;
      }

      setUsers(random);
      setIsGenerating(false);
    }, 1200);
  }

  const coverUrl = users.bookId
    ? `http://books.google.com/books/content?id=${users.bookId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`
    : null;

  return (
    <main className="min-h-screen flex flex-col bg-emerald-50 overflow-x-hidden">

      {/* MAIN */}
      <section className="flex-1 flex flex-col items-center w-full">

        {/* HERO TEXT */}
        <div className="w-full max-w-5xl px-6 py-12">
          <MainText />
        </div>

        {/* BUTTON */}
        <div className="flex flex-col items-center gap-6 w-full">

          <Buttons
            onClick={() => getRandomItem(booksInDB)}
            title={isGenerating ? "Generating..." : "CLICK HERE!"}
            disabled={isGenerating}
          />

          {/* LOADING */}
          {isGenerating && (
            <div className="flex flex-col items-center gap-4">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
              <p className="text-sm text-emerald-700 animate-pulse">
                Finding your next addictive read...
              </p>
            </div>
          )}
        </div>

        {/* RESULT */}
        <div className="w-full flex justify-center px-4 py-12">

          <div className="w-full max-w-3xl flex flex-col items-center gap-4">

            {/* HEADER */}
            {!isGenerating && hasGenerated && users.title && (
              <h2 className="text-center text-2xl font-bold text-emerald-700 tracking-wide">
                YOUR NEXT BOOK
              </h2>
            )}

            {/* BOOK CARD */}
            {!isGenerating && hasGenerated && users.title && (
              <div className="w-full rounded-2xl border border-emerald-100 bg-white shadow-xl overflow-hidden">

                <div className="p-6 flex flex-col items-center text-center gap-5">

                  {/* COVER */}
                  {coverUrl && (
                    <img
                      src={coverUrl}
                      alt={users.title}
                      className="h-64 w-auto rounded-xl shadow-md object-contain bg-gray-100 p-2"
                    />
                  )}

                  <h3 className="text-2xl font-bold text-gray-900">
                    {users.title}
                  </h3>

                  <p className="text-emerald-600 font-medium">
                    {users.author}
                  </p>

                  {users.publishedDate && (
                    <p className="text-sm text-gray-500">
                      Published: {users.publishedDate}
                    </p>
                  )}

                  <div className="w-16 h-1 bg-emerald-200 rounded-full" />

                  {/* GOODREADS LINK (REPLACED TEXT) */}
                  <a
                    href={goodreadsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald-600 underline hover:text-emerald-800 transition"
                  >
                    View on Goodreads 📖
                  </a>

                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {!isGenerating && hasGenerated && !users.title && (
              <div className="text-center text-gray-500">
                Click generate to discover your next book 📖
              </div>
            )}

          </div>

        </div>

      </section>

      <Footer src={cat} title="cat" />
    </main>
  );
}

export default GeneratePage;