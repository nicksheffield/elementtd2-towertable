import { createContext, useContext, useEffect, useState } from 'react'
import {
	convertElementNameToSymbols,
	convertSymbolToElementName,
	ElementName,
	elementNames,
	getBackgroundColor,
	getElementStroke,
	getElementText,
	getTowerParents,
	Range,
	Support,
	Tower,
	towers,
} from './data'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const isNotNull = <T,>(x: T | null): x is T => x !== null

const arrIsSame = (a: unknown[], b: unknown[]) => a.length === b.length && a.every((v) => b.includes(v))

const isUnlocked = (tower: Tower, elements: ElementName[]) => {
	return tower.elements.every((el) => elements.includes(el))
}

type ContextType = {
	elements: ElementName[]
	setElements: React.Dispatch<React.SetStateAction<ElementName[]>>
	hovered: Tower | null
	setHovered: React.Dispatch<React.SetStateAction<Tower | null>>
	range: Range | null
	setRange: React.Dispatch<React.SetStateAction<Range | null>>
	support: Support | null
	setSupport: React.Dispatch<React.SetStateAction<Support | null>>
}

const Context = createContext({} as ContextType)

function App() {
	const [elements, setElements] = useState<ElementName[]>(
		location.hash.split('').map(convertSymbolToElementName).filter(isNotNull)
	)
	const [hovered, setHovered] = useState<Tower | null>(null)
	const [range, setRange] = useState<Range | null>(null)
	const [support, setSupport] = useState<Support | null>(null)

	useEffect(() => {
		location.hash = elements.map(convertElementNameToSymbols).join('')
	}, [elements])

	return (
		<Context.Provider value={{ elements, setElements, hovered, setHovered, range, setRange, support, setSupport }}>
			{/* <Overlay /> */}
			<div className="flex flex-col gap-4 pt-4 h-screen">
				<div className="flex flex-row justify-between max-w-5xl container mx-auto border-b border-zinc-700 pb-4">
					<div className="text-sm">Picks Remaining: {11 - elements.length}</div>

					<div className="flex items-center gap-2">
						{[...Array(11)].fill(null).map((_, i) => (
							<div
								key={i}
								className={clsx(
									'text-sm font-medium w-6 h-6 rounded-md flex items-center justify-center',
									elements[i] ? getElementText(elements[i]) : 'bg-zinc-700'
								)}
							>
								{i * 5}
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-row justify-between max-w-5xl container mx-auto">
					<div className="flex gap-3 items-center">
						<div className="text-sm">Range:</div>
						<button
							className={twMerge(
								clsx(
									'rounded-sm bg-gray-200 hover:bg-gray-300 text-black px-2 text-sm font-medium',
									range === 750 && 'bg-red-500'
								)
							)}
							onClick={() => setRange((r) => (r !== 750 ? 750 : null))}
						>
							750
						</button>
						<button
							className={twMerge(
								clsx(
									'rounded-sm bg-gray-200 hover:bg-gray-300 text-black px-2 text-sm font-medium',
									range === 900 && 'bg-red-500'
								)
							)}
							onClick={() => setRange((r) => (r !== 900 ? 900 : null))}
						>
							900
						</button>
						<button
							className={twMerge(
								clsx(
									'rounded-sm bg-gray-200 hover:bg-gray-300 text-black px-2 text-sm font-medium',
									range === 1150 && 'bg-red-500'
								)
							)}
							onClick={() => setRange((r) => (r !== 1150 ? 1150 : null))}
						>
							1150
						</button>
						<button
							className={twMerge(
								clsx(
									'rounded-sm bg-gray-200 hover:bg-gray-300 text-black px-2 text-sm font-medium',
									range === 1500 && 'bg-red-500'
								)
							)}
							onClick={() => setRange((r) => (r !== 1500 ? 1500 : null))}
						>
							1500
						</button>
					</div>

					<div>
						<button
							className={'rounded-sm bg-gray-200 hover:bg-gray-300 text-black px-2 text-sm font-medium'}
							onClick={() => setElements([])}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
								/>
							</svg>
						</button>
					</div>

					<div className="flex gap-3 items-center">
						<div className="text-sm">Support:</div>
						<button
							className={twMerge(
								clsx(
									'rounded-sm bg-gray-200 hover:bg-gray-300 text-black px-2 text-sm font-medium',
									support === 'buff' && 'bg-green-500'
								)
							)}
							onClick={() => setSupport((r) => (r !== 'buff' ? 'buff' : null))}
						>
							Buff
						</button>
						<button
							className={twMerge(
								clsx(
									'rounded-sm bg-gray-200 hover:bg-gray-300 text-black px-2 text-sm font-medium',
									support === 'slow' && 'bg-green-500'
								)
							)}
							onClick={() => setSupport((r) => (r !== 'slow' ? 'slow' : null))}
						>
							Slow
						</button>
						<button
							className={twMerge(
								clsx(
									'rounded-sm bg-gray-200 hover:bg-gray-300 text-black px-2 text-sm font-medium',
									support === 'amplify' && 'bg-green-500'
								)
							)}
							onClick={() => setSupport((r) => (r !== 'amplify' ? 'amplify' : null))}
						>
							Amplify
						</button>
					</div>
				</div>

				<div className="flex flex-row justify-center flex-start h-full gap-8">
					<div className="grid grid-cols-6">
						<SectionRow getTowers={(element) => towers[element].filter((x) => x.elements.length === 1)} />
						<SectionRow getTowers={(element) => towers[element].filter((x) => x.elements.length === 2)} />
						<SectionRow getTowers={(element) => towers[element].filter((x) => x.elements.length === 3)} />
						<SectionRow getTowers={(element) => towers[element].filter((x) => x.elements.length === 4)} />
					</div>
				</div>
			</div>
		</Context.Provider>
	)
}

const shouldGlow = (hovered: Tower | null, tower: Tower) => {
	if (hovered === null) return false
	return (
		hovered.elements.reduce((acc, cur) => acc && tower.elements.includes(cur), true) ||
		tower.elements.reduce((acc, cur) => acc && hovered.elements.includes(cur), true)
	)
}

const TowerSelector = ({ tower }: { tower: Tower }) => {
	const { elements, setElements, hovered, setHovered, range, support } = useContext(Context)

	const isActive = tower.elements.reduce((acc, cur) => acc && elements.includes(cur), true)

	const level = Math.min(
		...elementNames.filter((x) => tower.elements.includes(x)).map((x) => elements.filter((y) => y === x).length)
	)

	const correctLevel = (level: number) => Math.min(level, 5 - tower.elements.length)

	const increase = () => {
		if (tower.elements.length === 1) {
			if (elements.length >= 11) return
			if (elements.filter((x) => x === tower.elements[0]).length >= 3) return
			setElements((e) => [...e, tower.elements[0]])
		} else {
			const targetLevel = correctLevel(level) + 1
			const maxLevel = correctLevel(5)
			const elementsToAdd: ElementName[] = []

			if (targetLevel > maxLevel) return

			tower.elements.forEach((element) => {
				let currentCount = elements.filter((x) => x === element).length

				if (targetLevel - currentCount < 0) return
				for (let i = 0; i < targetLevel - currentCount; i++) {
					elementsToAdd.push(element)
				}
			})

			if (elements.length + elementsToAdd.length > 11) return
			setElements((e) => [...e, ...elementsToAdd])
		}
	}

	const decrease = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault()

		if (tower.elements.length === 1) {
			setElements((e) => {
				let lastIndex = e.lastIndexOf(tower.elements[0])
				if (lastIndex === -1) return e
				return [...e.slice(0, lastIndex), ...e.slice(lastIndex + 1)]
			})
		} else {
			// setElements((e) => {
			// 	let clone = [...e]
			// 	tower.elements.forEach((x) => {
			// 		clone.splice(clone.lastIndexOf(x), 1)
			// 	})
			// 	return clone
			// })
			const activeTowers = Object.values(towers)
				.flat()
				.reduce<Tower[]>((list, t) => {
					if (t === tower) return list
					if (t.elements.reduce((acc, cur) => acc && elements.includes(cur), true)) {
						return [...list, t]
					}
					return list
				}, [])
			console.log('activeTowers', activeTowers)
		}
	}

	const willAdd = hovered && isUnlocked(tower, [...elements, ...hovered.elements]) && !isUnlocked(tower, elements)

	return (
		<div
			className="flex flex-col items-center w-16 select-none transition-transform scale-100 hover:scale-105 cursor-pointer"
			onClick={increase}
			onContextMenu={decrease}
			onMouseOver={() => setHovered(tower)}
			onMouseOut={() => setHovered(null)}
		>
			<div className="text-xs font-medium whitespace-nowrap">{tower.name}</div>
			{/* {elements.filter((x) => x === element).length || ''} */}
			<div
				className={twMerge(
					clsx(
						'relative',
						tower.elements.length === 1 ? 'rounded-full' : 'border-4 border-black',
						tower.range === range && 'border-red-500',
						tower.support === support && 'border-green-500',
						tower.range === range && tower.support === support && 'ring-4 ring-red-500 border-green-500',
						shouldGlow(hovered, tower) && tower !== hovered && 'glow',
						willAdd && 'border-white'
					)
				)}
			>
				<img className={clsx(!isActive && 'saturate-0 opacity-30')} src={tower.image} data-tower={tower.name} />

				{willAdd && (
					<div className="absolute inset-0 flex justify-center items-center text-3xl font-bold text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</div>
				)}
				<div className="absolute bottom-0 left-0 w-full flex justify-center text-3xl font-bold text-white">
					<div
						style={{
							textShadow:
								'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
						}}
					>
						{correctLevel(level) || ''}
					</div>
				</div>
			</div>
		</div>
	)
}

const SectionRow = ({ getTowers }: { getTowers: (element: ElementName) => Tower[] }) => {
	return (
		<>
			{(Object.keys(towers) as ElementName[]).map((element) => (
				<div
					key={element}
					className={`flex flex-row items-start flex-wrap justify-center content-start gap-4 w-44 py-4 px-0 ${getBackgroundColor(
						element
					)}`}
				>
					{getTowers(element).map((tower) => (
						<TowerSelector key={tower.name} tower={tower} />
					))}
				</div>
			))}
		</>
	)
}

type Line = {
	x1: number
	y1: number
	x2: number
	y2: number
	depth: number
	color: string
}

const createLine = (el1: HTMLImageElement, el2: HTMLImageElement, depth: number, color: string) => {
	let rect1 = el1.getBoundingClientRect()
	let rect2 = el2.getBoundingClientRect()

	return {
		x1: rect1.x + rect1.width / 2,
		y1: rect1.y + rect1.height / 2,
		x2: rect2.x + rect2.width / 2,
		y2: rect2.y + rect2.height / 2,
		depth,
		color,
	}
}

const Overlay = () => {
	const { hovered } = useContext(Context)

	function getLines(tower: Tower, depth: number, lines: Line[] = []): Line[] {
		let el = document.querySelector(`[data-tower="${tower.name}"]`) as HTMLImageElement
		let parents = getTowerParents(tower)
		let parentEls = parents.map((x) => document.querySelector(`[data-tower="${x.name}"]`) as HTMLImageElement)

		for (let i = 0; i < parentEls.filter(Boolean).length; i++) {
			const line = createLine(el, parentEls[i], depth, getElementStroke(parents[i].elements[0]))

			if (!lines.find((x) => x.x1 === line.x1 && x.x2 === line.x2 && x.y1 === line.y1 && x.y2 === line.y2)) {
				lines.push(line)
			}

			let parentTower = Object.values(towers)
				.flat()
				.find((x) => x.name === parentEls[i].dataset.tower)

			if (parentTower) {
				const parentTowerParents = getTowerParents(parentTower)

				if (parentTowerParents.length > 0) {
					getLines(parentTower, depth + 1, lines)
				}
			}
		}

		// let childTowers = Object.values(towers)
		// 	.flat()
		// 	.filter((x) => x.parents.includes(tower.name))

		// for (let i = 0; i < childTowers.length; i++) {
		// 	getLines(childTowers[i], lines)
		// }

		return lines
	}

	const lines: (Line | null)[] = hovered ? getLines(hovered, 0) : []

	return (
		<svg
			className="fixed z-10 top-0 left-0 w-screen h-screen pointer-events-none fill-none bg-transparent"
			viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
		>
			{lines.filter(isNotNull).map((line, i) => (
				<line
					key={i}
					x1={line.x1}
					x2={line.x2}
					y1={line.y1}
					y2={line.y2}
					className={line.color}
					strokeWidth={3}
					// style={{ opacity: 1 - line.depth * 0.33 }}
					// stroke="white"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			))}
		</svg>
	)
}

export default App
