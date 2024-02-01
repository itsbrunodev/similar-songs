import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pluralS(num: number) {
  return num === 1 ? "" : "s"
}

export function truncate(str: string, threshold = 23): string {
  console.log(str)
  if (str.length > threshold) {
    return str.slice(0, threshold - 1) + "...";
  }
  return str;
}