"use client";

import { useState } from "react";
import Link from "next/link";
import UserDropdown from "./UserDropdown";

function Nav() {
  const [open, setOpen] = useState(false);

  const linkClass = () =>
    `block rounded-lg px-4 py-2 text-sm font-medium transition text-gray-700 hover:bg-emerald-50 hover:text-emerald-700`;

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex w-full items-center px-4 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="rounded-md object-contain"
          />
          <Link href="/" className="text-lg font-bold text-gray-900">
            MyBookClub
          </Link>
        </div>

        <div className="flex-1" />
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/" className={linkClass()}>
            Book Generator
          </Link>

          <Link href="/books/search" className={linkClass()}>
            Search
          </Link>

          <Link href="/books/want-to-read" className={linkClass()}>
            Want To Read
          </Link>

          <Link href="/books/read" className={linkClass()}>
            Read Books
          </Link>
          <UserDropdown />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1 p-2 md:hidden"
        >
          <span className="h-0.5 w-6 bg-gray-800" />
          <span className="h-0.5 w-6 bg-gray-800" />
          <span className="h-0.5 w-6 bg-gray-800" />
        </button>
      </div>
      {open && (
        <div className="space-y-2 border-t border-gray-200 bg-white px-4 pb-4 pt-4 md:hidden">
          <Link href="/" className={linkClass()} onClick={() => setOpen(false)}>
            Book Generator
          </Link>
          <Link
            href="/books/search"
            className={linkClass()}
            onClick={() => setOpen(false)}
          >
            Search
          </Link>
          <Link
            href="/books/want-to-read"
            className={linkClass()}
            onClick={() => setOpen(false)}
          >
            Want To Read
          </Link>
          <Link
            href="/books/read"
            className={linkClass()}
            onClick={() => setOpen(false)}
          >
            Read Books
          </Link>
          <div className="pt-2">
            <UserDropdown />
          </div>
        </div>
      )}
    </nav>
  );
}
export default Nav;
