"use client";
import { UseRedirectedLogin } from "@/hooks/UseRedirectedLogin";
import BookCollection from "../../../components/BookCollection";
import UseClub from "@/hooks/useClub";

export default function ReadBooks() {
  const { user, loading } = UseRedirectedLogin();
  const { clubId } = UseClub();

  if (loading || !user) {
    return null;
  }

  return (
    <>
      <div className="bg-base-100 flex min-h-screen flex-col">
        <main className="flex-1">
          <BookCollection listName="Read" clubId={clubId} />
        </main>
      </div>
    </>
  );
}
