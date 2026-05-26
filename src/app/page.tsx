import Link from "next/link";
//TODO: ADD HOME PAGE HERE -----
export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>📚 Book Club App</h1>

      <p>Track your books, mark them as read, and stay organized.</p>

      <Link href="/login">
        <button style={{ marginTop: 20, padding: 10 }}>
          Login
        </button>
      </Link>
    </main>
  );
}