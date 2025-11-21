import type { ElementName, Support, Tower, Range } from '@/lib/data'
import { createContext, type Dispatch, type SetStateAction } from 'react'

type ContextType = {
	elements: ElementName[]
	setElements: Dispatch<SetStateAction<ElementName[]>>
	hovered: Tower | null
	setHovered: Dispatch<SetStateAction<Tower | null>>
	range: Range | null
	setRange: Dispatch<SetStateAction<Range | null>>
	support: Support | null
	setSupport: Dispatch<SetStateAction<Support | null>>
}

export const Context = createContext({} as ContextType)
