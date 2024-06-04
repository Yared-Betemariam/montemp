import { type ClassValue, clsx } from "clsx";
import { Hanken_Grotesk } from "next/font/google";
import { twMerge } from "tailwind-merge";

export const font = Hanken_Grotesk({ subsets: ["latin"] });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
