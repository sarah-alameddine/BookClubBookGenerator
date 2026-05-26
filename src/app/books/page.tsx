"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function BooksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
  try {
    await signOut(auth);

    router.push("/login");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  return (
    <main style={{ padding: 40 }}>
      <h1>Books Page</h1>

      <p>Logged in as:</p>
      <p>{user.email}</p>

      <button onClick={handleLogout}>
  Logout
</button>
    </main>
  );
}