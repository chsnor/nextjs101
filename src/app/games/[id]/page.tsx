import { initialGames } from "@/data/games";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = initialGames.find((item) => item.id === id);
  return {
    title: game ? `${game.title} - รายละเอียดเกม` : "ไม่พบข้อมูลเกม",
  };
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { id } = await params;
  const game = initialGames.find((item) => item.id === id);

  if (!game) {
    notFound();
  }

  return (
    <main className="page max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="space-y-6">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          กลับไปยังคลังเกมทั้งหมด
        </Link>

        <article className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm space-y-6">
          {game.coverUrl ? (
            <div className="relative w-full aspect-21/9 max-h-80 bg-slate-900 overflow-hidden">
              <img
                src={game.coverUrl}
                alt={game.title}
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                    {game.platform}
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {game.title}
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 pb-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                รายละเอียดเกมในคลัง
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {game.title}
              </h1>
            </div>
          )}

          <div className="p-6 sm:p-8 pt-0 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-600">
                สถานะการเล่นปัจจุบัน
              </span>

            <div className="shrink-0">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                  game.status === "เล่นจบแล้ว"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : game.status === "กำลังเล่น"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    game.status === "กำลังเล่น"
                      ? "bg-blue-500 animate-pulse"
                      : game.status === "เล่นจบแล้ว"
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />
                {game.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50/60 border border-slate-200/70 rounded-xl p-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                แพลตฟอร์ม
              </span>
              <strong className="text-lg font-bold text-slate-900">
                {game.platform}
              </strong>
            </div>

            <div className="bg-slate-50/60 border border-slate-200/70 rounded-xl p-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                เวลาเล่นโดยประมาณ
              </span>
              <strong className="text-lg font-bold text-slate-900">
                {game.estimatedHours}{" "}
                <span className="text-xs font-normal text-slate-500">ชั่วโมง</span>
              </strong>
            </div>
          </div>
          </div>
        </article>
      </div>
    </main>
  );
}
