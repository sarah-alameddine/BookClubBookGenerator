import Link from "next/link";
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-emerald-50 px-6 text-center">
      <h1 className="text-6xl font-bold text-emerald-600 lg:text-8xl">404</h1>

      <h2 className="mt-6 text-2xl font-bold text-gray-900 lg:text-4xl">
        Page not found
      </h2>
      <p className="mt-4 max-w-md text-base leading-7 text-emerald-600 lg:text-lg">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <img src="/images/404.gif" alt="404 gif" />
      <Link
        href="/"
        className="mt-8 rounded-full bg-emerald-600 px-8 py-4 font-medium text-white shadow-md transition hover:bg-emerald-700"
      >
        Go back home
      </Link>
    </main>
  );
}
