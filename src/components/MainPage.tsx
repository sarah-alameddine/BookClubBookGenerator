import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();
  const redirectToLogin = () => {
    router.replace("/login");
  };

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-emerald-50">
      {/* HEADER (matches GeneratePage result header style exactly) */}
      <section className="flex w-full flex-col items-center px-6 pb-10 pt-20 text-center">
        <div className="space-y-2">
          <h1 className="text-center text-5xl font-bold text-emerald-600 lg:text-8xl">
            BOOK CLUB GENERATOR
          </h1>

          <h1 className="text-center text-2xl font-bold text-emerald-500 lg:text-5xl">
            Built for indecisive readers
          </h1>
        </div>
      </section>

      {/* MAIN BUTTON */}
      <section className="flex flex-col items-center gap-6">
        <button
          className="rounded-full bg-emerald-600 px-8 py-4 font-medium text-white shadow-md transition hover:bg-emerald-700"
          onClick={redirectToLogin}
        >
          SIGN UP TO GENERATE
        </button>
        <div className="max-w-2xl px-6 text-center">
          <p className="text-base leading-8 text-emerald-600 lg:text-lg">
            Sign up or log in to create or join a book club, build a shared
            reading list, and generate your next group read together.
          </p>
        </div>
      </section>
    </main>
  );
}
