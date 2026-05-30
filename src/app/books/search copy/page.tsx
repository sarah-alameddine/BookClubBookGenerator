"use client";
import BookSearch from "../../../components/BookSearch";

export default function SearchBooks() {
  return (
    <>
      <div className="bg-base-100 flex min-h-screen flex-col">
        <main className="flex-1">
          <BookSearch />
        </main>
      </div>
    </>
  );
}
