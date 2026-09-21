import type { Game, GamePlatform } from "@/types/game";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  Monitor,
  Gamepad2,
  Smartphone,
  Clock,
} from "lucide-react";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
  onCycleStatus: () => void;
};

function getPlatformConfig(platform: GamePlatform): {
  badge: string;
  gradient: string;
  icon: typeof Monitor;
} {
  switch (platform) {
    case "PC":
      return {
        badge: "bg-sky-50 text-sky-700 border-sky-200/90",
        gradient: "from-sky-500 via-cyan-500 to-blue-600",
        icon: Monitor,
      };
    case "PlayStation 5":
      return {
        badge: "bg-indigo-50 text-indigo-700 border-indigo-200/90",
        gradient: "from-blue-600 via-indigo-600 to-violet-600",
        icon: Gamepad2,
      };
    case "Nintendo Switch":
      return {
        badge: "bg-rose-50 text-rose-700 border-rose-200/90",
        gradient: "from-rose-500 via-red-500 to-orange-500",
        icon: Gamepad2,
      };
    case "Xbox Series X/S":
      return {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200/90",
        gradient: "from-emerald-500 via-green-600 to-teal-600",
        icon: Gamepad2,
      };
    case "Mobile":
      return {
        badge: "bg-amber-50 text-amber-700 border-amber-200/90",
        gradient: "from-amber-500 via-orange-500 to-red-500",
        icon: Smartphone,
      };
    default:
      return {
        badge: "bg-slate-50 text-slate-700 border-slate-200",
        gradient: "from-slate-400 to-slate-600",
        icon: Gamepad2,
      };
  }
}

function getStatusBadgeStyle(status: Game["status"]): {
  badge: string;
  dot: string;
} {
  switch (status) {
    case "ยังไม่เริ่ม":
      return {
        badge: "bg-slate-100/90 text-slate-600 border-slate-200 hover:bg-slate-200/80",
        dot: "bg-slate-400",
      };
    case "กำลังเล่น":
      return {
        badge: "bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100/90 ring-1 ring-blue-500/20",
        dot: "bg-blue-500 animate-ping",
      };
    case "เล่นจบแล้ว":
      return {
        badge: "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/90 ring-1 ring-emerald-500/20",
        dot: "bg-emerald-600 ",
      };
    default:
      return {
        badge: "bg-slate-100 text-slate-600 border-slate-200",
        dot: "bg-slate-400",
      };
  }
}

export default function GameCard({
  game,
  onEdit,
  onDelete,
  onCycleStatus,
}: GameCardProps) {
  const platform = getPlatformConfig(game.platform);
  const statusStyle = getStatusBadgeStyle(game.status);
  const PlatformIcon = platform.icon;

  return (
    <article className="group bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      <div
        className={`h-1.5 w-full bg-linear-to-r ${platform.gradient} transition-all duration-300 group-hover:h-2`}
      />

      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
        {game.coverUrl ? (
          <img
            src={game.coverUrl}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-90 group-hover:brightness-100"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full bg-linear-to-br ${platform.gradient} opacity-20 flex items-center justify-center`}
          >
            <PlatformIcon size={48} className="text-white/40" />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md shadow-xs ${platform.badge}`}
          >
            <PlatformIcon size={13} />
            {game.platform}
          </span>
          <button
            type="button"
            onClick={onCycleStatus}
            title="คลิกเพื่อเปลี่ยนสถานะ"
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md transition active:scale-95 shadow-xs ${statusStyle.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
            {game.status}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-1.5 relative z-10">
        <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-800 transition line-clamp-1 leading-snug">
          <Link href={`/games/${game.id}`} className="hover:underline">
            {game.title}
          </Link>
        </h2>
      </div>

      <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Clock size={13} className="text-slate-400" />
          <strong className="text-xs sm:text-sm font-bold text-slate-800">
            {game.estimatedHours}
          </strong>
          <span className="text-[11px] text-slate-400">ชั่วโมง</span>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onEdit}
            title="แก้ไขข้อมูลเกม"
            className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition"
            aria-label="แก้ไขเกม"
          >
            <Pencil size={13} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            title="ลบเกม"
            className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
            aria-label="ลบเกม"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
