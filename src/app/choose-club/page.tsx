"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../services/firebase";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";

export default function ChooseClubPage() {
  const router = useRouter();

  const [clubName, setClubName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  // --------------- CREATE CLUB ------------------
  const createClub = async () => {
    const user = auth.currentUser;

    if (!user || !clubName) return;

    // 1. Create the club in Firestore
    const clubRef = await addDoc(collection(db, "clubs"), {
      name: clubName,
      createdBy: user.uid,
      createdAt: new Date(),
    });

    // 2. Save clubId onto the user
    await updateDoc(doc(db, "users", user.uid), {
      clubId: clubRef.id,
    });

    // 3. Move user into app
    router.push("/books");
  };

  // --------------- JOIN CLUB ------------------
  const joinClub = async () => {
    const user = auth.currentUser;

    if (!user || !joinCode) return;

    // 1. Check club exists
    const clubRef = doc(db, "clubs", joinCode);
    
    console.log("clubRef",clubRef);
    console.log("joinCode",joinCode);

    const clubSnap = await getDoc(clubRef);

      if (clubSnap.exists()) {
        console.log("Document data:", clubSnap.data());
      } else {
        // clubSnap.data() will be undefined in this case
        console.log("No such document!");
      }

    // 2. Attach user to that club
    await updateDoc(doc(db, "users", user.uid), {
      clubId: joinCode,
    });

    // 3. Enter app
    router.push("/books");
  };
  
  return (
    <main style={{ padding: 40 }}>
      <h1>Choose your Book Club</h1>

      {/* CREATE */}
      <section style={{ marginTop: 20 }}>
        <h2>Create a new club</h2>
        <input
          placeholder="Club name"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
        />
        <button onClick={createClub}>Create</button>
      </section>

      {/* JOIN */}
      <section style={{ marginTop: 40 }}>
        <h2>Join existing club</h2>
        <input
          placeholder="Enter club code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <button onClick={joinClub}>Join</button>
      </section>
    </main>
  );
}
