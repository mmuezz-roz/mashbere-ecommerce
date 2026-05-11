import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind CSS classes with clsx support.
 * Essential for dynamic class manipulation in shadcn-like components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
