"use client";

import { type CSSProperties, useEffect, useMemo, useState } from "react";

type SlidingTextRotatorProps = {
  items: string[];
  intervalMs?: number;
  finalIntervalMs?: number;
  finalAnimationMs?: number;
};

export default function SlidingTextRotator({
  items,
  intervalMs = 2200,
  finalIntervalMs = 3400,
  finalAnimationMs = 900,
}: SlidingTextRotatorProps) {
  const visibleItems = useMemo(() => items.filter(Boolean), [items]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (visibleItems.length < 2) {
      return;
    }

    if (activeIndex === visibleItems.length - 1) {
      return;
    }

    const nextIndex = activeIndex + 1;
    const timeoutMs =
      nextIndex === visibleItems.length - 1 ? finalIntervalMs : intervalMs;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex(nextIndex);
    }, timeoutMs);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, finalIntervalMs, intervalMs, visibleItems.length]);

  if (visibleItems.length === 0) {
    return null;
  }

  const visibleIndex = Math.min(activeIndex, visibleItems.length - 1);
  const isFinalItem = visibleIndex === visibleItems.length - 1;
  const animationStyle = {
    "--sliding-text-duration": `${isFinalItem ? finalAnimationMs : 500}ms`,
  } as CSSProperties;

  return (
    <span
      className="relative inline-flex h-6 min-w-28 overflow-hidden align-bottom font-mono tracking-normal"
      aria-live="polite"
    >
      <span
        key={visibleIndex}
        className="sliding-text-reveal whitespace-nowrap"
        style={animationStyle}
      >
        {visibleItems[visibleIndex]}
      </span>
    </span>
  );
}
