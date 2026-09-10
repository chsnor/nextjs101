"use client";

import { useState } from "react";

export default function CounterDemo() {
  const [count, setCount] = useState(0);

  function handleClick() { 
  setCount((x) => x + 1); 
 
}

  return (
    <button type="button" onClick={handleClick}>
      Like {count} 
    </button>
  );
}
