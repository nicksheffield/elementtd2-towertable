import { TowerSelector } from '@/components/TowerSelector'
import {
	getBackgroundColor,
	towers,
	type ElementName,
	type Tower,
} from '@/lib/data'
import { cn } from '@/lib/utils'

export const SectionRow = ({
	getTowers,
	row,
}: {
	getTowers: (element: ElementName) => Tower[]
	row: number
}) => {
	return (
		<>
			{(Object.keys(towers) as ElementName[]).map((element, col) => (
				<div
					key={element}
					className={cn(
						'flex flex-row items-start flex-wrap justify-center content-start gap-4 w-44 py-4 px-0',
						getBackgroundColor(element),
						row === 0 && col === 0 && 'rounded-tl-xl',
						row === 0 && col === 5 && 'rounded-tr-xl',
						row === 3 && col === 0 && 'rounded-bl-xl',
						row === 3 && col === 5 && 'rounded-br-xl'
					)}
				>
					{getTowers(element).map((tower) => (
						<TowerSelector key={tower.name} tower={tower} />
					))}
				</div>
			))}
		</>
	)
}
