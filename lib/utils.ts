import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a price amount with currency symbol
 * @param amount - The price amount (can be null/undefined)
 * @param currency - Currency symbol (default: "£")
 * @returns Formatted price string (e.g., "£599.99")
 */
export function formatPrice(
  amount: number | null | undefined,
  currency = "£"
): string {
  return `${currency}${(amount ?? 0).toFixed(2)}`;
}

type DateFormatOption = "short" | "long" | "datetime";

const DATE_FORMAT_OPTIONS: Record<
  DateFormatOption,
  Intl.DateTimeFormatOptions
> = {
  short: { day: "numeric", month: "short" },
  long: { day: "numeric", month: "long", year: "numeric" },
  datetime: {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
};