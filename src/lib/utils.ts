import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { transformHref } from "@/config/domain-config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Re-export transformHref from domain-config for backward compatibility
export const getDomainSpecificHref = transformHref
