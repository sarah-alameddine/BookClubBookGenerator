"use client";
import GeneratePage from "@/components/GeneratePage";
import MainPage from "@/components/MainPage";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, loading } = useAuth();
  return <main>{!loading && !user ? <MainPage /> : <GeneratePage />}</main>;
}
