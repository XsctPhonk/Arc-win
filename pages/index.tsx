export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-800 to-blue-900 text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center drop-shadow">
        🎯 Arc-win
      </h1>
      <p className="text-xl text-center max-w-xl mb-10">
        Your arcade-winning companion. Track fails, predict payouts, plan strategies, and take notes on your arcade journey.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md text-center">
        <a
          href="/ai-chat"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-2xl shadow-lg transition"
        >
          💬 Talk to Arc
          <br />
          <span className="text-sm text-blue-200">Strategy AI Assistant</span>
        </a>

        <a
          href="/fail-counter"
          className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-2xl shadow-lg transition"
        >
          📉 Fail Counter
          <br />
          <span className="text-sm text-red-200">Track your luck & odds</span>
        </a>

        <a
          href="/notebook"
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-4 rounded-2xl shadow-lg transition"
        >
          📓 Notebook
          <br />
          <span className="text-sm text-yellow-100">Log machine data</span>
        </a>
      </div>
    </main>
  );
}
