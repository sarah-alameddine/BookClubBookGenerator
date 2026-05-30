import UseClub from "@/hooks/useClub";

function MainText() {
  const { clubName, loading } = UseClub();

  if (loading) return null;

  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <h1 className="text-center text-5xl font-bold text-emerald-600 lg:text-8xl">
        GENERATE
      </h1>

      <h1 className="text-center text-2xl font-bold text-emerald-500 lg:text-3xl">
        THE NEXT BOOK FOR
      </h1>

      <h2 className="text-2xl font-bold lg:text-6xl">
        <span className="uppercase text-emerald-600 underline decoration-emerald-300 decoration-2 underline-offset-4">
          {clubName}
        </span>{" "}
        <span className="text-emerald-600">Book Club</span>
      </h2>

      <h1 className="text-center text-sm font-bold text-emerald-500 lg:text-lg">
        CAUSE WE ARE ALL INDECISIVE
      </h1>
    </div>
  );
}

export default MainText;
