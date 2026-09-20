import { SelectHTMLAttributes } from "react";

export function Select({
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full sm:w-auto pl-8 pr-7 py-1.5 bg-slate-50/70 focus:bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold focus:border-emerald-600 outline-none cursor-pointer appearance-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
