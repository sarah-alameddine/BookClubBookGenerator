import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/services/firebase";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";

export default function CreateClub() {
  const router = useRouter();
  const [clubName, setClubName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  // --------------- CREATE CLUB ------------------
  const createClub = async () => {
    const user = auth.currentUser;

    if (!user || !clubName) return;

    const clubRef = await addDoc(collection(db, "clubs"), {
      name: clubName,
      createdBy: user.uid,
      createdAt: new Date(),
    });

    await updateDoc(doc(db, "users", user.uid), {
      clubId: clubRef.id,
    });

    router.push("/");
  };

  // --------------- JOIN CLUB ------------------
  const joinClub = async () => {
    const user = auth.currentUser;

    if (!user || !joinCode) return;

    const clubRef = doc(db, "clubs", joinCode);
    const clubSnap = await getDoc(clubRef);

    if (!clubSnap.exists()) return;

    await updateDoc(doc(db, "users", user.uid), {
      clubId: joinCode,
    });

    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col bg-emerald-50 px-6 py-16">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-emerald-600 lg:text-6xl">
          Choose your Book Club
        </h1>
      </section>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        {/* CREATE CLUB */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Create a new club
          </h2>

          <input
            placeholder="Club name"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={createClub}
            className="mt-4 w-full rounded-full bg-emerald-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-emerald-700"
          >
            Create Club
          </button>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-emerald-200" />

          <span className="text-xs font-medium uppercase tracking-wider text-emerald-500">
            or join existing club
          </span>

          <div className="h-px flex-1 bg-emerald-200" />
        </div>

        {/* JOIN CLUB */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Join existing club
          </h2>

          <input
            placeholder="Enter club code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={joinClub}
            className="mt-4 w-full rounded-full bg-emerald-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-emerald-700"
          >
            Join Club
          </button>
        </div>
      </div>
    </main>
  );
}
