import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button, buttonVariants } from '@/components/ui/button'
import { RefreshCwIcon } from 'lucide-react'
import { Context } from '@/lib/Context'
import { cn, isNotNull } from '@/lib/utils'
import { picksCount } from '@/lib/constants'
import { Overlay } from '@/components/Overlay'
import { SectionRow } from '@/components/SectionRow'
import {
	convertElementNameToSymbols,
	convertSymbolToElementName,
	type ElementName,
	getElementText,
	type Range,
	ranges,
	type Support,
	supports,
	type Tower,
	towers,
} from '@/lib/data'
import { ButtonGroup } from '@/components/ui/button-group'

const arrPicks = Array.from({ length: picksCount })

const selectionRows = Array.from({ length: 4 })

export const App = () => {
	const [elements, setElements] = useState<ElementName[]>(
		location.hash
			.split('')
			.map(convertSymbolToElementName)
			.filter(isNotNull)
	)

	const [fakeElements, setFakeElements] = useState<ElementName[]>([])

	const [hovered, setHovered] = useState<Tower | null>(null)
	const [range, setRange] = useState<Range | null>(null)
	const [support, setSupport] = useState<Support | null>(null)

	const [showOverlay, setShowOverlay] = useState(false)

	useEffect(() => {
		location.hash = elements.map(convertElementNameToSymbols).join('')
	}, [elements])

	return (
		<Context.Provider
			value={{
				elements: fakeElements.length ? fakeElements : elements,
				setElements,
				hovered,
				setHovered,
				range,
				setRange,
				support,
				setSupport,
			}}
		>
			{showOverlay && <Overlay />}

			<div className="flex flex-row justify-center">
				<div className="flex flex-col gap-4 pt-4 h-screen max-w-max">
					<div className="flex flex-row justify-between items-center">
						<div className="text-2xl font-semibold">
							<a
								href="https://store.steampowered.com/app/1018830/Element_TD_2__Tower_Defense/"
								target="_blank"
								rel="noreferrer"
								className="underline-offset-4 underline hover:text-indigo-400 "
							>
								Element TD 2
							</a>{' '}
							Tower Table
						</div>
						<div className="flex items-center gap-4">
							<Button
								variant="secondary"
								onClick={() => setElements([])}
							>
								<RefreshCwIcon />
								Reset
							</Button>

							<ThemeToggle />
						</div>
					</div>

					<div className="flex flex-row justify-between">
						<div className="flex flex-row gap-6">
							<div className="flex gap-2 flex-col">
								<div className="text-sm font-medium">Range</div>

								<ButtonGroup>
									{ranges.map((x) => (
										<Button
											key={x}
											variant={
												x === range
													? 'destructive'
													: 'secondary'
											}
											size="sm"
											onClick={() =>
												setRange((r) =>
													r !== x ? x : null
												)
											}
										>
											{x}
										</Button>
									))}
								</ButtonGroup>
							</div>

							<div className="flex gap-2 flex-col">
								<div className="text-sm font-medium">
									Support
								</div>

								<ButtonGroup>
									{supports.map((x) => (
										<Button
											key={x}
											variant={
												x === support
													? 'success'
													: 'secondary'
											}
											size="sm"
											onClick={() =>
												setSupport((r) =>
													r !== x ? x : null
												)
											}
										>
											{x}
										</Button>
									))}
								</ButtonGroup>
							</div>
						</div>

						<div className="flex flex-col items-end gap-2">
							<div className="text-sm font-medium">
								Picks Remaining: {picksCount - elements.length}
							</div>

							<div className="flex items-center border rounded-md overflow-hidden divide-x">
								{arrPicks.map((_, i) => (
									<div
										key={i}
										className={cn(
											'relative text-sm font-medium size-8 flex items-center justify-center select-none',
											elements[i]
												? getElementText(elements[i])
												: 'bg-none',
											fakeElements.length &&
												fakeElements.length < i + 1 &&
												'opacity-25'
										)}
										onMouseOver={() =>
											setFakeElements(
												elements.slice(0, i + 1)
											)
										}
										onMouseOut={() => setFakeElements([])}
									>
										{i * 5}
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="flex flex-row justify-center flex-start">
						<div className="grid grid-cols-6">
							{selectionRows.map((_, i) => (
								<SectionRow
									key={i}
									row={i}
									getTowers={(element) =>
										towers[element].filter(
											(x) => x.elements.length === i + 1
										)
									}
								/>
							))}
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-sm font-medium">
							<a
								href="https://nicksheffield.com"
								target="_blank"
								rel="noreferrer"
								className={cn(
									buttonVariants({
										variant: 'secondary',
									}),
									'text-indigo-500 bg-indigo-600/20 hover:bg-indigo-600/40'
								)}
							>
								Built by Nick
							</a>
						</div>
						<Label className="flex items-center gap-2">
							<Checkbox
								checked={showOverlay}
								onCheckedChange={() =>
									setShowOverlay((x) => !x)
								}
							/>
							Explain prerequisites on hover
						</Label>
					</div>
				</div>
			</div>
		</Context.Provider>
	)
}
