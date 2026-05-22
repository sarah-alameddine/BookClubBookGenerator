import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import catLook from "../assets/images/catLook.jpg";

function Nav() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-emerald-500 text-white shadow-sm"
        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

        {/* LEFT (LOGO) */}
        <div className="flex items-center gap-3">
          <img
            src={catLook}
            alt="cat"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-lg font-bold text-gray-900">
            BooklingsBookClub
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-2">
          <NavLink to="/" className={linkClass}>
            Book Generator
          </NavLink>

          <NavLink to="/search2" className={linkClass}>
            Search
          </NavLink>

          <NavLink to="/CurrReadPage" className={linkClass}>
            Current Books
          </NavLink>

          <NavLink to="/readPage" className={linkClass}>
            Read Books
          </NavLink>
        </div>

        {/* HAMBURGER BUTTON (MOBILE) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1 p-2"
        >
          <span className="h-0.5 w-6 bg-gray-800" />
          <span className="h-0.5 w-6 bg-gray-800" />
          <span className="h-0.5 w-6 bg-gray-800" />
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 space-y-2">

          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
            Book Generator
          </NavLink>

          <NavLink to="/search2" className={linkClass} onClick={() => setOpen(false)}>
            Search
          </NavLink>

          <NavLink
            to="/CurrReadPage"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Current Books
          </NavLink>

          <NavLink
            to="/readPage"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Read Books
          </NavLink>

        </div>
      )}
    </nav>
  );
}

export default Nav;