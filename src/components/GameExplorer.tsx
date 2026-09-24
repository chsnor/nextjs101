"use client";

import { useState } from "react";
import GameCard from "@/components/GameCard";
import GameForm, { type GameDraft } from "@/components/GameForm";
import {
  GAME_PLATFORMS,
  type Game,
  type GamePlatform,
  type GameStatus,
} from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { Select } from "@/components/ui/Select";
import { MetricCard } from "@/components/ui/MetricCard";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { toast } from "sonner";
import {
  Search,
  Trophy,
  Flame,
  Clock,
  Gamepad2,
  
} from "lucide-react";
import Fuse from "fuse.js";

function draftToGame(draft: GameDraft): Omit<Game, "id"> {
  return {
    title: draft.title.trim(),
    platform: draft.platform as GamePlatform,
    estimatedHours: Number(draft.estimatedHours),
    status: draft.status as GameStatus,
    coverUrl: draft.coverUrl?.trim() || undefined,
  };
}

export default function GameExplorer() {
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

  function handleCreate(draft: GameDraft) {
    addGame(draftToGame(draft));
    toast.success(`เพิ่มเกม "${draft.title.trim()}" เรียบร้อยแล้ว`);
  }

  function handleUpdate(id: string, draft: GameDraft) {
    updateGame(id, draftToGame(draft));
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

  const playingCount = games.filter((g) => g.status === "กำลังเล่น").length;
  const finishedCount = games.filter((g) => g.status === "เล่นจบแล้ว").length;
  const completionRate =
    games.length > 0 ? Math.round((finishedCount / games.length) * 100) : 0;
  const pendingGame = games.find((game) => game.id === pendingDeleteId);
  const editingGame = games.find((game) => game.id === editingId);

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

  return (
    <div className="space-y-6">
      <section
        className="grid grid-cols-2 lg:grid-cols-4 gap-3.5"
        aria-label="สถิติคลังเกม"
      >
        <MetricCard
          title="ทั้งหมดในคลัง"
          value={games.length}
          unit="เกม"
          icon={Gamepad2}
          colorClass="text-slate-600 font-bold"
          bgClass="bg-slate-100"
        />
        <MetricCard
          title="กำลังเล่น"
          value={playingCount}
          unit="เกม"
          icon={Flame}
          colorClass="text-blue-600"
          bgClass="bg-blue-50"
        />
        <MetricCard
          title="เล่นจบแล้ว"
          extraInfo={`(${completionRate}%)`}
          value={finishedCount}
          unit="เกม"
          icon={Trophy}
          colorClass="text-emerald-700"
          bgClass="bg-emerald-50"
          progressBarWidth={completionRate}
        />
        <MetricCard
          title="เวลาที่ยังค้าง"
          value={unstartedTotalHours}
          unit="ชั่วโมง"
          icon={Clock}
          colorClass="text-amber-600"
          bgClass="bg-amber-50"
        />
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
              {
                id: "เล่นจบแล้ว",
                label: `จบแล้ว (${finishedCount})`,
              },
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
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="     ค้นหาชื่อเกม..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50/70 focus:bg-white border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 text-slate-900 placeholder-slate-400 rounded-xl text-xs font-medium transition outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              </div>
              <Select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                aria-label="กรองตามแพลตฟอร์ม"
              >
                <option value="all">ทุกแพลตฟอร์ม</option>
                {GAME_PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
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
              onDelete={() => setPendingDeleteId(game.id)}
              onCycleStatus={() => {
                cycleStatus(game.id);
                toast.info(`เปลี่ยนสถานะ "${game.title}" แล้ว`);
              }}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!pendingDeleteId && !!pendingGame}
        title={pendingGame?.title}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
