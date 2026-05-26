"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/books");
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  const handleSignUp = async () => {
    setError("");

    try {
      console.log("Starting signup...");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("User created:", userCredential.user.uid);

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        clubId: null,
      });

      console.log("User profile saved");

      alert("redirecting...");
      router.push("/choose-club");
      console.log("USER UID:", user.uid);
      console.log("Redirect triggered");
    } catch (err: any) {
      console.error("SIGNUP ERROR:", err.code, err.message);
      setError(`${err.code}: ${err.message}`);
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      <h1>Sign Up</h1>

      <button onClick={handleSignUp}>SIGN UP</button>

      <button onClick={() => router.push("/choose-club")}>Test Redirect</button>
    </main>
  );
}
