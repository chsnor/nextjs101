import { Band } from "@/types/band";
import Image from "next/image";
import MemberItem from "./MemberItem";
import CounterDemo from "@/components/CounterDemo";

export type BandcardProp = {
  band: Band;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export default function BandCard({
  band,
  isFavorite,
  onToggleFavorite,
}: BandcardProp) {
  const { bandname, img, member } = band;
  return (
    <article className="group bg-slate-800/70 border border-slate-700/70 hover:border-emerald-500/50 rounded-2xl overflow-hidden flex flex-col shadow-lg hover:shadow-2xl hover:shadow-emerald-950/30 transition duration-300 backdrop-blur-xs">
      {/* Band Cover Image */}
      {img && (
        <div className="relative w-full aspect-16/9 overflow-hidden bg-slate-900">
          <Image
            src={img}
            alt={bandname}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-60" />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title and Follow Button */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-white tracking-wide group-hover:text-emerald-400 transition">
            {bandname}
          </h2>
          <button
            type="button"
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(band.id)}
            className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition duration-200 shrink-0 ${
              isFavorite
                ? "bg-emerald-500 text-white shadow-xs shadow-emerald-500/30 hover:bg-emerald-600"
                : "bg-slate-700/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 ${isFavorite ? "fill-current" : "fill-none stroke-current"}`}
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {isFavorite ? "ติดตามแล้ว" : "ติดตาม"}
          </button>
        </div>

        {/* Counter Demo / Action bar */}
        <div>
          <CounterDemo />
        </div>

        {/* Member Section */}
        <div className="pt-3 border-t border-slate-700/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              สมาชิก ({member.length})
            </h3>
          </div>
          <ul className="space-y-2.5">
            {member.map((m) => (
              <MemberItem key={m.name} member={m} />
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
