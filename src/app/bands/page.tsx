import { bands } from "@/data/bandsdata";
import BandExplorer from "@/components/BandExplorer";

export default function BandPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden selection:bg-emerald-500 selection:text-slate-950">
      {/* Ambient background glow effects */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-linear-to-tr from-emerald-500/15 via-teal-500/10 to-indigo-500/15 blur-3xl rounded-full opacity-70" />
      <div className="pointer-events-none absolute top-40 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-96 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Header Hero Section */}
        

        {/* Band Explorer */}
        <BandExplorer bands={bands} />
      </div>
    </main>
  );
}
