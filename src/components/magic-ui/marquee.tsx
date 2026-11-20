import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /** Reverse the scrolling direction. */
  reverse?: boolean;
  /** Pause the animation while the pointer hovers the marquee. */
  pauseOnHover?: boolean;
  /** Scroll vertically instead of horizontally. */
  vertical?: boolean;
  /** Number of copies rendered to keep the loop seamless. */
  repeat?: number;
}

/**
 * Magic UI Marquee — a seamless, CSS-driven infinite scroll strip.
 * The animation is defined by the `marquee` keyframes in globals.css.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      {...props}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          className={cn("flex shrink-0 [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
