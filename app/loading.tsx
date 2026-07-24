export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#09090b] px-6">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
        <span className="loader-dot" />
        Loading portfolio
      </div>
    </main>
  );
}
