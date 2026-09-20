import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function InputField({
  label,
  error,
  id,
  className = "",
  ...props
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-4 py-2.5 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:border-emerald-600 focus:ring-3 focus:ring-emerald-500/10 outline-none transition ${className}`}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1.5 font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}
