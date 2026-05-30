"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import UseClub from "@/hooks/useClub";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { user } = useAuth();
  const { clubName, loading } = UseClub();

  // Close menu when clicking outside it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="relative ml-4" ref={menuRef}>
      {/* User icon*/}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white"
      >
        {user?.email?.charAt(0).toUpperCase() || "?"}
      </button>

      {/* DROPDOWN */}
      {open && !loading && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
          {/* NOT LOGGED IN */}
          {!user ? (
            <>
              <p className="text-sm text-gray-500">You are not signed in</p>
              <button
                onClick={() => {
                  setOpen(false);

                  router.push("/login");
                }}
                className="mt-4 w-full rounded-lg bg-emerald-500 p-2 text-sm font-medium text-white transition hover:bg-emerald-600"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              {/* LOGGED IN */}
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="mt-1 break-words font-medium text-gray-900">
                {user.email}
              </p>
              <div className="my-3 border-t border-gray-100" />
              <p className="text-sm text-gray-500">Club</p>
              <p className="mt-1 font-medium text-gray-900">{clubName}</p>
              <button
                onClick={handleLogout}
                className="mt-4 w-full rounded-lg bg-red-500 p-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
