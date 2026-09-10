"use client";
import { Band } from "@/types/band";
import { useState, type ChangeEvent } from "react";
import BandCard from "@/components/BandCard";
import Fuse from "fuse.js";
type BandExplorerProps = {
  bands: Band[];
};
const fuseOptions = {
  keys: ["bandname", "member.name"],
  threshold: 0.4,
};
export default function BandExplorer({ bands }: BandExplorerProps) {
  const [keyword, setKeyword] = useState("");
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }
  const fuse = new Fuse(bands, fuseOptions);
  const visibleBands = !keyword.trim()
    ? bands
    : fuse.search(keyword.trim()).map((result) => result.item);

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id],
    );
  }
  return (
    <div className="space-y-8">
      {/* Search and Stats Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl shadow-black/40">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg
              className="w-5 h-5 text-emerald-400/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            aria-label="ค้นหาวง"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="ค้นหาชื่อวงดนตรี หรือชื่อสมาชิก..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-950/70 border border-slate-700/60 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 text-slate-100 placeholder-slate-500 rounded-xl text-sm transition duration-200 outline-hidden shadow-inner"
          />
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword("")}
              className="cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 text-xs"
              aria-label="ล้างคำค้นหา"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/60 border border-emerald-500/20 text-slate-300 text-sm font-medium shadow-inner">
            <span>
              ติดตามแล้ว{" "}
              <strong className="text-emerald-400 font-semibold text-base">
                {favoriteIds.length}
              </strong>{" "}
              <span className="text-xs text-slate-400">/ {bands.length} วง</span>
            </span>
          </div>
        </div>
      </div>

      {/* Band Cards Grid / Empty State */}
      {visibleBands.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-800/30 border border-dashed border-slate-700 rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-slate-800 text-slate-400">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-200">
            ไม่พบวงดนตรีที่ตรงกับเงื่อนไข
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            ลองเปลี่ยนคำค้นหา หรือค้นหาด้วยชื่อสมาชิกวง
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFavorite={favoriteIds.includes(band.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
