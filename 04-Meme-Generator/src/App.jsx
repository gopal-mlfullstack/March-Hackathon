import { useState } from "react";
function App() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [randomImage, setRandomImage] = useState(
    "https://i.imgflip.com/1g8my4.jpg",
  ); // Starter meme (Darke hotline bling)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRandomMeme = async () => {
    setLoading(true);
    setError(null); // clear previous errors

    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error("API retured failure");
      }
      const memes = data.data.memes; // Array of ~100 memes
      const randomIndex = Math.floor(Math.random() * memes.length);
      const randomMeme = memes[randomIndex];

      setRandomImage(randomMeme.url); // Updating Image URL
    } catch (err) {
      setError(err.message || "Failed to load memes. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen
      bg-gradient-to-br
      from-purple-900
      via-indigo-900
      to-blue-900
      text-white
      p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            Meme Generator
          </h1>
          <p className="text-xl md:text-2xl opacity-80">
            Create your own memes
          </p>
        </header>
        {/* Form + Preview  */}
        <section className="bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-white/10">
          {/* Meme Preview Area */}
          <div className="relative mx-auto max-w-xl mb-8">
            <img
              src={randomImage}
              alt="Meme template"
              className="w-full rounded-xl shadow-lg object-contain"
            />
            {/* top text overlay */}
            <h2 className="absolute top-4 left-0 right-0 text-center text-4xl md:text-6xl font-impact uppercase text-white tracking-wide drop-shadow-[0_4px_8px_rgba(0, 0, 0, 0.9)] pointer-events-none">
              {topText || "Top Text"}
            </h2>

            {/* bottom text overlay */}
            <h2 className="absolute bottom-4 left-0 right-0 text-center text-4xl md:text-6xl font-impact uppercase text-white tracking-wide drop-shadow-[0_4px_8px_rgba(0, 0, 0, 0.9)] pointer-events-none">
              {bottomText || "Bottom Text"}
            </h2>
          </div>

          {/* Inputs */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Top text here..."
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-lg placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition "
            />
            <input
              type="text"
              placeholder="Bottom text here..."
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-lg placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition "
            />
          </form>

          {/* Button (we'll make it work next)  */}
          <button
            type="button"
            onClick={getRandomMeme}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-xl text-xl transition transform  hover:scale-105 shadow-lg"
          >
            {loading ? "Loading new meme..." : "Get New Meme Image"}
          </button>
          {error && (
            <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
