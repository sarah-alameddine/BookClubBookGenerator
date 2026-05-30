import React from "react";
import type { OpenLibraryBookRaw } from "../types";
import Buttons from "./Buttons";

type Props = {
  book: OpenLibraryBookRaw;
  alreadyAdded: boolean;
  addedBookId: string | null;
  onAdd: (book: OpenLibraryBookRaw) => void;
};

export default function BookCard({
  book,
  alreadyAdded,
  addedBookId,
  onAdd,
}: Props) {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "/images/catScream.jpg";

  const author = book.author_name?.join(", ") || "Unknown";

  return (
    <li>
      <article className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-4 text-center lg:flex-row lg:text-left">
            <div className="h-48 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
              <img
                loading="lazy"
                className="h-full w-full object-contain"
                alt={book.title}
                src={cover}
              />
            </div>

            <div className="min-w-0 space-y-3 lg:px-6">
              <h2 className="break-words text-2xl font-semibold text-gray-900">
                {book.title}
              </h2>

              <p className="break-words font-medium text-emerald-600">
                {author}
              </p>

              {book.first_publish_year && (
                <p className="text-sm text-gray-500">
                  {book.first_publish_year}
                </p>
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
            <Buttons
              onClick={() => onAdd(book)}
              title={
                alreadyAdded
                  ? "Already Added"
                  : addedBookId === book.key
                    ? "Added!"
                    : "Add Book"
              }
              disabled={alreadyAdded || addedBookId === book.key}
            />
          </div>
        </div>
      </article>
    </li>
  );
}
