import { useState, useEffect } from "react";

function App() {
  const [tag, setTag] = useState("");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError(err.message);
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Quote Generator
        </h1>

        {/* Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={fetchQuote}
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Get New Quote"}
          </button>
        </div>

        {/* Result Area */}
        <div className="min-h-[200px] flex items-center justify-center text-center">
          {loading && <p className="text-gray-400">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {quote && !loading && (
            <div>
              <p className="text-lg text-gray-700 italic">"{quote.quote}"</p>
              <p className="mt-4 text-sm text-gray-500">— {quote.author}</p>
            </div>
          )}
          {!quote && !loading && !error && (
            <p className="text-gray-400">Click "Get New Quote" to start!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
