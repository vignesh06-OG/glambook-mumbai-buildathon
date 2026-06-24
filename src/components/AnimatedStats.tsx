"use client";

import { useEffect, useRef, useState } from "react";
import { SALONS } from "@/lib/salons";

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active || target === 0) {
      setCount(target);
      return;
    }
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, active]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  delay,
  active,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
  active: boolean;
}) {
  const counted = useCountUp(value, 1600, active);

  return (
    <div
      className="glass-card rounded-2xl border border-blush-soft/30 px-6 py-5 text-center anim-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="font-display text-3xl sm:text-4xl font-bold gradient-text-bright">
        {counted}
        {suffix && <span className="text-blush-bright">{suffix}</span>}
      </p>
      <p className="mt-2 text-sm text-muted font-medium">{label}</p>
    </div>
  );
}

export function AnimatedStats() {
  const { ref, inView } = useInView(0.2);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-5 sm:grid-cols-4">
      <StatItem value={SALONS.length} suffix="+" label="Curated Salons" delay={0} active={inView} />
      <StatItem value={4} suffix=" AI" label="AI Features" delay={100} active={inView} />
      <StatItem value={4} suffix=".6★" label="Avg Rating" delay={200} active={inView} />
      <StatItem value={22} label="Mumbai Areas" delay={300} active={inView} />
    </div>
  );
}