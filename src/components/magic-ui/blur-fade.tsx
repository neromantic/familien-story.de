import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: Direction;
  /** When false, the animation starts immediately instead of on scroll. */
  inView?: boolean;
  blur?: string;
}

/**
 * Magic UI Blur Fade — reveals its children with a short blur/offset
 * transition. Respects `prefers-reduced-motion` by rendering immediately.
 */
export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = true,
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewResult = useInView(ref, { once: true, amount: 0.12 });
  const isInView = !inView || inViewResult;
  const reduceMotion = useReducedMotion();

  const defaultVariants: Variants = {
    hidden: {
      [direction]: reduceMotion ? 0 : offset,
      opacity: reduceMotion ? 1 : 0,
      filter: reduceMotion ? "blur(0px)" : `blur(${blur})`,
    },
    visible: {
      [direction]: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant ?? defaultVariants}
      transition={{ delay, duration, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
