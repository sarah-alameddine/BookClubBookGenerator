"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebase";

export default function LoginPage() {
  const router = useRouter();

  // LOGIN STATE
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // SIGN UP STATE
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // UI STATE
  const [error, setError] = useState("");

  // separate loading states (IMPORTANT FIX)
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  // LOGIN
  const handleLogin = async () => {
    setError("");
    setLoginLoading(true);

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // SIGN UP
  const handleSignUp = async () => {
    setError("");
    setSignupLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        clubId: null,
      });

      router.push("/club");
    } catch (err: any) {
      setError(err.message || "Sign up failed");
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-md">
        {/* TITLE */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Booklings Book Club
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login or create an account
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* LOGIN */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-emerald-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-emerald-500"
          />

          <button
            onClick={handleLogin}
            disabled={loginLoading}
            className="w-full rounded-lg bg-emerald-500 p-3 font-medium text-white transition hover:bg-emerald-600 disabled:opacity-50"
          >
            {loginLoading ? "Loading..." : "Login"}
          </button>
        </div>

        {/* DIVIDER */}
        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="px-4 text-sm text-gray-500">
            Don’t have an account?
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* SIGN UP */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Account
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-emerald-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-emerald-500"
          />

          <button
            onClick={handleSignUp}
            disabled={signupLoading}
            className="w-full rounded-lg bg-gray-900 p-3 font-medium text-white transition hover:bg-black disabled:opacity-50"
          >
            {signupLoading ? "Loading..." : "Create Account"}
          </button>
        </div>
      </div>
    </main>
  );
}
