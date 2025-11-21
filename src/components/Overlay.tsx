import { Context } from '@/lib/Context'
import {
	getElementStroke,
	getTowerParents,
	towers,
	type Tower,
} from '@/lib/data'
import { isNotNull } from '@/lib/utils'
import { use } from 'react'

type Line = {
	x1: number
	y1: number
	x2: number
	y2: number
	depth: number
	color: string
}

const createLine = (
	el1: HTMLImageElement,
	el2: HTMLImageElement,
	depth: number,
	color: string
) => {
	const rect1 = el1.getBoundingClientRect()
	const rect2 = el2.getBoundingClientRect()

	return {
		x1: rect1.x + rect1.width / 2,
		y1: rect1.y + rect1.height / 2,
		x2: rect2.x + rect2.width / 2,
		y2: rect2.y + rect2.height / 2,
		depth,
		color,
	}
}

function getLines(tower: Tower, depth: number, lines: Line[] = []): Line[] {
	const el = document.querySelector(
		`[data-tower="${tower.name}"]`
	) as HTMLImageElement

	const parents = getTowerParents(tower)

	const parentEls = parents.map(
		(x) =>
			document.querySelector(
				`[data-tower="${x.name}"]`
			) as HTMLImageElement
	)

	for (let i = 0; i < parentEls.filter(Boolean).length; i++) {
		const line = createLine(
			el,
			parentEls[i],
			depth,
			getElementStroke(parents[i].elements[0])
		)

		if (
			!lines.find(
				(x) =>
					x.x1 === line.x1 &&
					x.x2 === line.x2 &&
					x.y1 === line.y1 &&
					x.y2 === line.y2
			)
		) {
			lines.push(line)
		}

		const parentTower = Object.values(towers)
			.flat()
			.find((x) => x.name === parentEls[i].dataset.tower)

		if (parentTower) {
			const parentTowerParents = getTowerParents(parentTower)

			if (parentTowerParents.length > 0) {
				getLines(parentTower, depth + 1, lines)
			}
		}
	}

	return lines
}

export const Overlay = () => {
	const { hovered } = use(Context)

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
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			))}
		</svg>
	)
}
