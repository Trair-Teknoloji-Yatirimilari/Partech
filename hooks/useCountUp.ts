"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useCountUp(
  target: number,
  duration = 1400,
  decimals = 0,
  start = false
) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced || !start) {
      setValue(target);
      return;
    }

    let raf: number;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, decimals, start, reduced]);

  return value;
}
