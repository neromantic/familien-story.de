import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimalPlaces?: number;
  startValue?: number;
  /** Pad whole numbers, e.g. 2 for the "01"–"03" process steps. */
  minimumIntegerDigits?: number;
}

/**
 * Magic UI Number Ticker — animates a number when it scrolls into view.
 * The optional `minimumIntegerDigits` keeps the process numbers padded.
 */
export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  startValue = 0,
  minimumIntegerDigits = 1,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(reduceMotion ? value : startValue);
  const springValue = useSpring(
    motionValue,
    reduceMotion
      ? { stiffness: 1000, damping: 100 }
      : { damping: 20, stiffness: 100 },
  );
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const format = (input: number) =>
    new Intl.NumberFormat("en-US", {
      minimumIntegerDigits,
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
      useGrouping: false,
    }).format(input);

  useEffect(() => {
    if (reduceMotion) {
      if (ref.current) ref.current.textContent = format(value);
      return;
    }

    if (!isInView) return;

    const timer = window.setTimeout(() => {
      motionValue.set(direction === "down" ? startValue : value);
    }, delay * 1000);

    return () => window.clearTimeout(timer);
    // `format` only depends on the values below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionValue, isInView, delay, value, direction, startValue, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = format(Number(latest.toFixed(decimalPlaces)));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [springValue, decimalPlaces, minimumIntegerDigits, reduceMotion]);

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums tracking-wider", className)}
    >
      {format(reduceMotion ? value : startValue)}
    </span>
  );
}
