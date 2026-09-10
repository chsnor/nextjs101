"use client";

import { useState } from "react";

export default function CounterDemo() {
  const [count, setCount] = useState(0);

  function handleClick() { 
  setCount(count + 1); 
 
}

  return (
    <button
      type="button"
      onClick={handleClick}
      className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-700/60 hover:bg-slate-700 text-pink-400 hover:text-pink-300 border border-slate-600/70 hover:border-pink-500/50 transition duration-200 active:scale-95"
    >
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
      </svg>
      <span>Like</span>
      <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-slate-800 text-pink-300 text-[11px] font-bold">
        {count}
      </span>
    </button>
  );
}
