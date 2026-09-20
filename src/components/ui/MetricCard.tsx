import { Gamepad2, Flame, Trophy, Clock, LucideIcon } from "lucide-react";

type MetricItemProps = {
  title: string;
  value: number | string;
  unit: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  extraInfo?: string;
  progressBarWidth?: number;
};

export function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  colorClass,
  bgClass,
  extraInfo,
  progressBarWidth,
}: MetricItemProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-bold uppercase tracking-wider ${colorClass}`}>
          {title} {extraInfo}
        </span>
        <div className={`p-1.5 rounded-lg ${bgClass} ${colorClass}`}>
          <Icon size={15} />
        </div>
      </div>
      <div className="mt-2.5">
        <div className="flex items-baseline gap-1.5 mb-1">
          <strong className={`text-2xl sm:text-3xl font-black tracking-tight ${colorClass}`}>
            {value}
          </strong>
          <span className="text-xs text-slate-400 font-medium">{unit}</span>
        </div>
        {progressBarWidth !== undefined && (
          <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${progressBarWidth}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
