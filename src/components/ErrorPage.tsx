import catScream from "../assets/images/catScream.jpg";

export default function ErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md bg-white border border-gray-200 shadow-sm rounded-3xl p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 overflow-hidden">
          <img
            src={catScream}
            alt="catScream"
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Whatcha doing here?!?!
        </h1>
        <p className="mt-3 text-gray-600">
          The page you’re looking for doesn’t exist or an unexpected error
          occurred.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-xl bg-emerald-500 px-6 py-3 text-white font-medium shadow-sm transition hover:bg-emerald-600"
        >
          Go back home
        </a>
      </div>
    </main>
  );
}
