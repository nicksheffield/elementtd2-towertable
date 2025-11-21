import { picksCount } from '@/lib/constants'
import { Context } from '@/lib/Context'
import { elementNames, towers, type ElementName, type Tower } from '@/lib/data'
import { cn, isUnlocked } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import { use } from 'react'

const axis = Array.from({ length: 3 })
const textShadow = axis
	.map((_, y) => {
		return axis
			.map((_, x) => {
				return `${x - 1}px ${y - 1}px 0 var(--color-background),${
					(x - 1) * 2
				}px ${(y - 1) * 2}px 0 var(--color-background)`
			})
			.join(',')
	})
	.join(',')

const shouldGlow = (hovered: Tower | null, tower: Tower) => {
	if (hovered === null) return false

	return (
		hovered.elements.some((x) => tower.elements.includes(x)) ||
		tower.elements.some((x) => hovered.elements.includes(x))
	)
}

export const TowerSelector = ({ tower }: { tower: Tower }) => {
	const { elements, setElements, hovered, setHovered, range, support } =
		use(Context)

	const isActive = tower.elements.reduce(
		(acc, cur) => acc && elements.includes(cur),
		true
	)

	const level = Math.min(
		...elementNames
			.filter((x) => tower.elements.includes(x))
			.map((x) => elements.filter((y) => y === x).length)
	)

	const correctLevel = (level: number) =>
		Math.min(level, 5 - tower.elements.length)

	const increase = () => {
		if (tower.elements.length === 1) {
			if (elements.length >= picksCount) return
			if (elements.filter((x) => x === tower.elements[0]).length >= 3)
				return
			setElements((e) => [...e, tower.elements[0]])
		} else {
			const targetLevel = correctLevel(level) + 1
			const maxLevel = correctLevel(5)
			const elementsToAdd: ElementName[] = []

			if (targetLevel > maxLevel) return

			tower.elements.forEach((element) => {
				const currentCount = elements.filter(
					(x) => x === element
				).length

				if (targetLevel - currentCount < 0) return
				for (let i = 0; i < targetLevel - currentCount; i++) {
					elementsToAdd.push(element)
				}
			})

			if (elements.length + elementsToAdd.length > picksCount) return
			setElements((e) => [...e, ...elementsToAdd])
		}
	}

	const decrease = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault()

		if (tower.elements.length === 1) {
			setElements((e) => {
				const lastIndex = e.lastIndexOf(tower.elements[0])
				if (lastIndex === -1) return e
				return [...e.slice(0, lastIndex), ...e.slice(lastIndex + 1)]
			})
		} else {
			const activeTowers = Object.values(towers)
				.flat()
				.reduce<Tower[]>((list, t) => {
					if (t === tower) return list
					if (
						t.elements.reduce(
							(acc, cur) => acc && elements.includes(cur),
							true
						)
					) {
						return [...list, t]
					}
					return list
				}, [])
			console.log('activeTowers', activeTowers)
		}
	}

	const willAdd =
		hovered &&
		isUnlocked(tower, [...elements, ...hovered.elements]) &&
		!isUnlocked(tower, elements)

	return (
		<div
			className="flex flex-col items-center w-16 select-none transition-transform scale-100 hover:scale-105 cursor-pointer"
			onClick={increase}
			onContextMenu={decrease}
			onMouseOver={() => setHovered(tower)}
			onMouseOut={() => setHovered(null)}
		>
			<div className="text-xs font-medium text-foreground whitespace-nowrap">
				{tower.name}
			</div>

			<div
				className={cn(
					'relative',
					tower.elements.length === 1
						? 'rounded-full'
						: 'border-4 border-background',
					tower.range === range && 'border-red-500',
					tower.support === support && 'border-green-500',
					tower.range === range &&
						tower.support === support &&
						'ring-4 ring-red-500 border-green-500',
					shouldGlow(hovered, tower) && tower !== hovered && 'glow',
					willAdd && 'border-foreground'
				)}
			>
				<img
					className={cn(!isActive && 'saturate-0 opacity-30')}
					src={tower.image}
					data-tower={tower.name}
				/>

				{willAdd && (
					<div className="absolute inset-0 flex justify-center items-center text-3xl font-bold text-foreground">
						<PlusIcon className="size-9" />
					</div>
				)}

				<div className="absolute bottom-0 left-0 w-full flex justify-center text-3xl font-bold text-foreground">
					<div
						style={{
							// textShadow:
							// 	'-1px -1px 0 var(--color-background), 1px -1px 0 var(--color-background), -1px 1px 0 var(--color-background), 1px 1px 0 var(--color-background), -2px -2px 0 var(--color-background), 2px -2px 0 var(--color-background), -2px 2px 0 var(--color-background), 2px 2px 0 var(--color-background)',
							textShadow,
						}}
					>
						{correctLevel(level) || ''}
					</div>
				</div>
			</div>
		</div>
	)
}
