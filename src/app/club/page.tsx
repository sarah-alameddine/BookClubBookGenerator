"use client";
import { UseRedirectedLogin } from "@/hooks/UseRedirectedLogin";
import CreateClub from "@/components/CreateClub";

export default function SearchBooks() {
  const { user, loading } = UseRedirectedLogin();

  if (loading || !user) {
    return null;
  }

  return (
    <>
      <div className="bg-base-100 flex min-h-screen flex-col">
        <main className="flex-1">
          <CreateClub />
        </main>
      </div>
    </>
  );
}
