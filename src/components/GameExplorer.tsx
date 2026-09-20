"use client";

import { useState, type ChangeEvent } from "react";
import GameCard from "@/components/GameCard";
import GameForm, { type GameDraft } from "@/components/GameForm";
import type { Game, GamePlatform, GameStatus } from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { toast } from "sonner";
import {
  Search,
  Trophy,
  Flame,
  Clock,
  Sparkles,
  Gamepad2,
  Filter,
} from "lucide-react";
import Fuse from "fuse.js";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const games = useGameStore((state) => state.games);
  const addGame = useGameStore((state) => state.addGame);
  const updateGame = useGameStore((state) => state.updateGame);
  const deleteGame = useGameStore((state) => state.deleteGame);
  const cycleStatus = useGameStore((state) => state.cycleStatus);
  const restoreGame = useGameStore((state) => state.restoreGame);

  const [keyword, setKeyword] = useState("");
  const [filterPlatform, setFilterPlatform] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const unstartedTotalHours = games
    .filter((game) => game.status === "ยังไม่เริ่ม")
    .reduce((sum, game) => sum + game.estimatedHours, 0);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  const filteredByDropdowns = games.filter((game) => {
    const matchesPlatform =
      filterPlatform === "all" || game.platform === filterPlatform;
    const matchesStatus =
      filterStatus === "all" || game.status === filterStatus;
    return matchesPlatform && matchesStatus;
  });

  const fuse = new Fuse(filteredByDropdowns, {
    keys: ["title", "platform"],
    threshold: 0.4,
  });

  const visibleGames = !keyword.trim()
    ? filteredByDropdowns
    : fuse.search(keyword.trim()).map((result) => result.item);

  function handleCreate(draft: GameDraft) {
    addGame({
      title: draft.title.trim(),
      platform: draft.platform as GamePlatform,
      estimatedHours: Number(draft.estimatedHours),
      status: draft.status as GameStatus,
      coverUrl: draft.coverUrl?.trim() || undefined,
    });
    toast.success(`เพิ่มเกม "${draft.title.trim()}" เรียบร้อยแล้ว`);
  }

  function handleDelete(id: string) {
    setPendingDeleteId(id);
  }

  function confirmDelete() {
    if (pendingDeleteId) {
      deleteGame(pendingDeleteId);
      setPendingDeleteId(null);
      toast.error("ลบเกมออกจากคลังแล้ว", {
        action: {
          label: "กู้คืน",
          onClick: () => {
            restoreGame();
            toast.success("กู้คืนเกมเรียบร้อยแล้ว");
          },
        },
      });
    }
  }

  function handleUpdate(id: string, draft: GameDraft) {
    updateGame(id, {
      title: draft.title.trim(),
      platform: draft.platform as GamePlatform,
      estimatedHours: Number(draft.estimatedHours),
      status: draft.status as GameStatus,
      coverUrl: draft.coverUrl?.trim() || undefined,
    });
    setEditingId(null);
    toast.success("บันทึกการแก้ไขเรียบร้อยแล้ว");
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  const playingCount = games.filter((g) => g.status === "กำลังเล่น").length;
  const finishedCount = games.filter((g) => g.status === "เล่นจบแล้ว").length;
  const completionRate =
    games.length > 0 ? Math.round((finishedCount / games.length) * 100) : 0;
  const pendingGame = games.find((game) => game.id === pendingDeleteId);
  const editingGame = games.find((game) => game.id === editingId);

  return (
    <div className="space-y-6">
      <section
        className="grid grid-cols-2 lg:grid-cols-4 gap-3.5"
        aria-label="สถิติคลังเกม"
      >
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              ทั้งหมดในคลัง
            </span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
              <Gamepad2 size={15} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <strong className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {games.length}
            </strong>
            <span className="text-xs text-slate-400 font-medium">เกม</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
              กำลังเล่น
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Flame size={15} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <strong className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">
              {playingCount}
            </strong>
            <span className="text-xs text-slate-400 font-medium">เกม</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              เล่นจบแล้ว ({completionRate}%)
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Trophy size={15} />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1.5 mb-2">
              <strong className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
                {finishedCount}
              </strong>
              <span className="text-xs text-slate-400 font-medium">เกม</span>
            </div>
            <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
              เวลาที่ยังค้าง
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Clock size={15} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <strong className="text-2xl sm:text-3xl font-black text-amber-600 tracking-tight">
              {unstartedTotalHours}
            </strong>
            <span className="text-xs text-slate-400 font-medium">ชั่วโมง</span>
          </div>
        </div>
      </section>

      {(isFormOpen || editingId !== null) && (
        <GameForm
          key={editingId ?? "new"}
          initialGame={editingGame}
          onSave={(draft) => {
            handleSave(draft);
            setIsFormOpen(false);
          }}
          onCancel={() => {
            setEditingId(null);
            setIsFormOpen(false);
          }}
        />
      )}

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: `ทั้งหมด (${games.length})` },
              { id: "กำลังเล่น", label: `กำลังเล่น (${playingCount})` },
              {
                id: "ยังไม่เริ่ม",
                label: `ยังไม่เริ่ม (${games.length - playingCount - finishedCount})`,
              },
              { id: "เล่นจบแล้ว", label: `จบแล้ว (${finishedCount})` },
            ].map((tab) => {
              const isActive = filterStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterStatus(tab.id)}
                  className={`cursor-pointer shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setIsFormOpen(true);
              }}
              className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition shadow-xs active:scale-95"
            >
              <span>+ เพิ่มเกมใหม่</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="relative w-full sm:flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search size={15} />
            </div>
            <input
              type="search"
              aria-label="ค้นหาเกม"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="ค้นหาชื่อเกม..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50/70 focus:bg-white border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 text-slate-900 placeholder-slate-400 rounded-xl text-xs font-medium transition outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Filter size={13} />
              </div>
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="w-full sm:w-auto pl-8 pr-7 py-1.5 bg-slate-50/70 focus:bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold focus:border-emerald-600 outline-none cursor-pointer appearance-none"
                aria-label="กรองตามแพลตฟอร์ม"
              >
                <option value="all">ทุกแพลตฟอร์ม</option>
                <option value="PC">PC</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Xbox Series X/S">Xbox Series X/S</option>
                <option value="Mobile">Mobile</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400 text-[10px]">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>

      {visibleGames.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-2">
          <p className="text-slate-700 font-semibold text-sm">
            ไม่พบเกมที่ตรงกับการค้นหา
          </p>
          <p className="text-slate-400 text-xs">
            ลองปรับเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรองด้านบน
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={() => {
                setEditingId(game.id);
                setIsFormOpen(true);
              }}
              onDelete={() => handleDelete(game.id)}
              onCycleStatus={() => {
                cycleStatus(game.id);
                toast.info(`เปลี่ยนสถานะ "${game.title}" แล้ว`);
              }}
            />
          ))}
        </div>
      )}

      {pendingDeleteId && pendingGame ? (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-slate-900">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-red-600">ยืนยันการลบเกม</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                คุณต้องการลบ &ldquo;{pendingGame.title}&rdquo; ออกจากคลัง Backlog หรือไม่?
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs transition"
                onClick={() => setPendingDeleteId(null)}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-xs transition shadow-sm"
                onClick={confirmDelete}
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
