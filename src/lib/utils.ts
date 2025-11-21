import type { ElementName, Tower } from '@/lib/data'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const isNotNull = <T>(x: T | null): x is T => x !== null

export const isUnlocked = (tower: Tower, elements: ElementName[]) => {
	return tower.elements.every((el) => elements.includes(el))
}
