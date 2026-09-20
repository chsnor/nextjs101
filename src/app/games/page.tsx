import { initialGames } from "@/data/games";
import GameExplorer from "@/components/GameExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คลังเกม (Game Backlog)",
  description: "จัดการและติดตามสถานะเกมที่กำลังเล่น แพลตฟอร์ม และระยะเวลาการเล่น",
};

export default function GamesPage() {
  return (
    <main className="page max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8 pb-6 border-b border-slate-200/80">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Game Backlog
        </h1>
      </div>
      <GameExplorer initialGames={initialGames} />
    </main>
  );
}
