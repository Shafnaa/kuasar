import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hardRegEx(regex: string) {
  return "".concat(
    "^.*",
    ...regex.split("").map((x) => `(${x.toUpperCase()}|${x.toLowerCase()})`),
    ".*$"
  );
}
