import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI Bento Grid — the responsive layout shell for the portfolio
 * gallery. The default classes are intentionally generic; the portfolio
 * overrides columns, gaps and row heights through `.portfolio-bento`.
 */
export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
