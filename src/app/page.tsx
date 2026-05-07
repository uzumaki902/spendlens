export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          AI Spend Audit Tool
        </p>

        <h1 className="mt-6 text-6xl font-bold tracking-tight">
          SpendLens
        </h1>

        <p className="mt-6 text-lg text-zinc-400 leading-8">
          Discover where your startup is overspending on AI tools and uncover smarter alternatives in minutes.
        </p>

        <button
          className="mt-10 rounded-2xl bg-white px-6 py-3 text-black font-medium hover:bg-zinc-200 transition"
          aria-label="Start your free AI spend audit"
        >
          Start Free Audit
        </button>
      </div>
    </main>
  );
}