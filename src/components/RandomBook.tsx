import React from "react";

interface RandomBookProps {
  hasGenerated: boolean;
  users?: {
    title: string;
    author: string;
    bookId: string;
  };
}

function RandomBook({ users, hasGenerated }: RandomBookProps) {
  const hasBook = !!users?.bookId;

  return (
    <div className="flex">
      <div className="lg:mx-auto lg:p-8 pt-0 px-32">
        <h1
          className={`text-1xl lg:text-2xl font-bold text-center ${
            !hasBook ? "opacity-0" : ""
          }`}
        >
          OUR NEXT BOOK IS:
        </h1>

        {hasGenerated && !hasBook && (
          <div className="flex justify-center py-12">
            <div className="rounded-3xl border border-base-200 bg-base-100 shadow-sm p-8 max-w-md text-center">
              <p className="text-lg font-semibold">
                No books have been added yet.
              </p>

              <p className="text-sm text-base-content mt-2">
                Search to find and add new books to your current reading list.
              </p>
            </div>
          </div>
        )}

        {hasBook && (
          <div>
            <div className="w-full lg:w-96 h-[23rem] lg:h-[23rem] py-12">
              <img
                className="rounded lg:mx-auto shadow max-h-48 object-contain"
                alt={`${users?.title} book`}
                src={`http://books.google.com/books/content?id=${users?.bookId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
              />

              <div className="px-4">
                <h1 className="text-center text-3xl py-2 break-words max-w-full whitespace-normal">
                  {users?.title}
                </h1>

                <h1 className="text-center text-1xl py-1 text-base font-normal text-primary break-words max-w-full whitespace-normal">
                  {users?.author}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomBook;
