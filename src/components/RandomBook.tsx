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
      <div className="px-32 pt-0 lg:mx-auto lg:p-8">
        <h1
          className={`text-1xl text-center font-bold lg:text-2xl ${
            !hasBook ? "opacity-0" : ""
          }`}
        >
          OUR NEXT BOOK IS:
        </h1>

        {hasGenerated && !hasBook && (
          <div className="flex justify-center py-12">
            <div className="border-base-200 bg-base-100 max-w-md rounded-3xl border p-8 text-center shadow-sm">
              <p className="text-lg font-semibold">
                No books have been added yet.
              </p>

              <p className="text-base-content mt-2 text-sm">
                Search to find and add new books to your current reading list.
              </p>
            </div>
          </div>
        )}

        {hasBook && (
          <div>
            <div className="h-[23rem] w-full py-12 lg:h-[23rem] lg:w-96">
              <img
                className="max-h-48 rounded object-contain shadow lg:mx-auto"
                alt={`${users?.title} book`}
                src={`http://books.google.com/books/content?id=${users?.bookId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
              />

              <div className="px-4">
                <h1 className="max-w-full whitespace-normal break-words py-2 text-center text-3xl">
                  {users?.title}
                </h1>

                <h1 className="text-1xl text-primary max-w-full whitespace-normal break-words py-1 text-center text-base font-normal">
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
