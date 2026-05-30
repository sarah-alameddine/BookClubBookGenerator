import { useState } from "react";
import MainText from "./MainText";
import Buttons from "./Buttons";
import { useBookStore } from "../hooks/useBookStore";
import type { ClubBook } from "../types";
import UseClub from "@/hooks/useClub";

function GeneratePage() {
  const [users, setUsers] = useState<ClubBook>({
    author: "",
    bookId: "",
    publishedDate: "",
    read: false,
    title: "",
    id: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { clubId } = UseClub();

  const { books: booksInDB } = useBookStore(clubId);

  const goodreadsLink = users.title
    ? `https://www.goodreads.com/search?q=${encodeURIComponent(
        users.title + " " + users.author,
      )}`
    : "#";

  function getRandomItem(books: ClubBook[]) {
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

  console.log("Generated book:", users);
  console.log("bookId:", users.bookId);

  const coverUrl = users.cover || "/images/catScream.jpg";

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-emerald-50">
      {/* ---------------- MAIN --------------------*/}
      <section className="flex w-full flex-1 flex-col items-center">
        <div className="w-full max-w-5xl px-6 py-12">
          <MainText />
        </div>

        {/* BUTTON */}
        <div className="flex w-full flex-col items-center gap-6">
          <Buttons
            onClick={() => getRandomItem(booksInDB)}
            title={isGenerating ? "Generating..." : "Generate Book"}
            disabled={isGenerating}
          />

          {/* LOADING */}
          {isGenerating && (
            <div className="flex flex-col items-center gap-4">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
              <p className="animate-pulse text-sm text-emerald-700">
                Finding your next addictive read...
              </p>
            </div>
          )}
        </div>

        {/* ---------------- RESULT ------------- */}
        <div className="flex w-full justify-center px-4 py-12">
          <div className="flex w-full max-w-3xl flex-col items-center gap-4">
            {/* HEADER */}
            {!isGenerating && hasGenerated && users.title && (
              <h2 className="text-center text-2xl font-bold tracking-wide text-emerald-700">
                YOUR NEXT BOOK
              </h2>
            )}

            {/* BOOK CARD */}
            {!isGenerating && hasGenerated && users.title && (
              <div className="w-full overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl">
                <div className="flex flex-col items-center gap-5 p-6 text-center">
                  <img
                    loading="lazy"
                    className="h-48 w-32 flex-shrink-0 rounded-xl bg-gray-100 object-contain p-2"
                    alt={users.title}
                    src={coverUrl}
                    onError={(e) => {
                      e.currentTarget.src = "/images/catScream.jpg";
                    }}
                  />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {users.title}
                  </h3>
                  <p className="font-medium text-emerald-600">{users.author}</p>

                  {users.publishedDate && (
                    <p className="text-sm text-gray-500">
                      Published: {users.publishedDate}
                    </p>
                  )}

                  <div className="h-1 w-16 rounded-full bg-emerald-200" />
                  <a
                    href={goodreadsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald-600 underline transition hover:text-emerald-800"
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

            <p className="mt-2 text-xs italic text-gray-400">
              Selected from your 'Want To Read' list
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GeneratePage;
