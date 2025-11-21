import Light from '@/assets/light/Light.webp'
import AtomTower from '@/assets/light/Atom_Tower.webp'
import LightningTower from '@/assets/light/Lightning_Tower.webp'
import TrickeryTower from '@/assets/light/Trickery_Tower.webp'
import AstralTower from '@/assets/light/Astral_Tower.webp'
import LaserTower from '@/assets/light/Laser_Tower.webp'
import NovaTower from '@/assets/light/Nova_Tower.webp'
import RailgunTower from '@/assets/light/Railgun_Tower.webp'
import SingularityTower from '@/assets/light/Singularity_Tower.webp'

import Darkness from '@/assets/dark/Darkness.webp'
import PoisonTower from '@/assets/dark/Poison_Tower.webp'
import DiseaseTower from '@/assets/dark/Disease_Tower.webp'
import RunicTower from '@/assets/dark/Runic_Tower.webp'
import EtherealTower from '@/assets/dark/Ethereal_Tower.webp'
import JinxTower from '@/assets/dark/Jinx_Tower.webp'
import PlagueTower from '@/assets/dark/Plague_Tower.webp'
import DoomTower from '@/assets/dark/Doom_Tower.webp'
import PhantomZoneTower from '@/assets/dark/PhantomZone_Tower.webp'

import Water from '@/assets/water/Water.webp'
import VaporTower from '@/assets/water/Vapor_Tower.webp'
import IceTower from '@/assets/water/Ice_Tower.webp'
import WellTower from '@/assets/water/Well_Tower.webp'
import FloodingTower from '@/assets/water/Flooding_Tower.webp'
import WispTower from '@/assets/water/Wisp_Tower.webp'
import WindstormTower from '@/assets/water/Windstorm_Tower.webp'
import PolarTower from '@/assets/water/Polar_Tower.webp'
import TsunamiTower from '@/assets/water/Tsunami_Tower.webp'
import CrystalSpireTower from '@/assets/water/CrystalSpire_Tower.webp'

import Fire from '@/assets/fire/Fire.webp'
import SolarTower from '@/assets/fire/Solar_Tower.webp'
import InfernalTower from '@/assets/fire/Infernal_Tower.webp'
import BlacksmithTower from '@/assets/fire/Blacksmith_Tower.webp'
import FlamethrowerTower from '@/assets/fire/Flamethrower_Tower.webp'
import HasteTower from '@/assets/fire/Haste_Tower.webp'
import CorrosionTower from '@/assets/fire/Corrosion_Tower.webp'
import ObeliskTower from '@/assets/fire/Obelisk_Tower.webp'
import RageTower from '@/assets/fire/Rage_Tower.webp'

import Nature from '@/assets/nature/Nature.webp'
import MushroomTower from '@/assets/nature/Mushroom_Tower.webp'
import BloomTower from '@/assets/nature/Bloom_Tower.webp'
import ImpulseTower from '@/assets/nature/Impulse_Tower.webp'
import GolemTower from '@/assets/nature/Golem_Tower.webp'
import RootTower from '@/assets/nature/Root_Tower.webp'
import IncantationTower from '@/assets/nature/Incantation_Tower.webp'
import ArchdruidTower from '@/assets/nature/Archdruid_Tower.webp'
import TeslaTreeTower from '@/assets/nature/TeslaTree_Tower.webp'
import LifeAltarTower from '@/assets/nature/LifeAltar_Tower.webp'

import Earth from '@/assets/earth/Earth.webp'
import HowitzerTower from '@/assets/earth/Howitzer_Tower.webp'
import GeyserTower from '@/assets/earth/Geyser_Tower.webp'
import QuakeTower from '@/assets/earth/Quake_Tower.webp'
import MoneyTower from '@/assets/earth/Money_Tower.webp'
import MuckTower from '@/assets/earth/Muck_Tower.webp'
import ShredderTower from '@/assets/earth/Shredder_Tower.webp'
import NuclearReactorTower from '@/assets/earth/NuclearReactor_Tower.webp'
import GravityCannonTower from '@/assets/earth/GravityCannon_Tower.webp'

export const elementNames = [
	'light',
	'dark',
	'water',
	'fire',
	'nature',
	'earth',
] as const
export type ElementName = (typeof elementNames)[number]

export const ranges = [750, 900, 1150, 1500] as const
export type Range = (typeof ranges)[number]

export const supports = ['buff', 'slow', 'amplify'] as const
export type Support = (typeof supports)[number]

export type Elements = ElementName[]

export const getElementText = (element: ElementName) =>
	element === 'light'
		? 'bg-yellow-100 text-black'
		: element === 'dark'
		? 'bg-purple-800 text-black'
		: element === 'water'
		? 'bg-blue-500 text-black'
		: element === 'fire'
		? 'bg-red-500 text-black'
		: element === 'nature'
		? 'bg-green-500 text-black'
		: 'bg-yellow-800 text-black'

export const getElementStroke = (element: ElementName) =>
	element === 'light'
		? 'stroke-yellow-100'
		: element === 'dark'
		? 'stroke-purple-800'
		: element === 'water'
		? 'stroke-blue-500'
		: element === 'fire'
		? 'stroke-red-500'
		: element === 'nature'
		? 'stroke-green-500'
		: 'stroke-yellow-800'

export const getBackgroundColor = (element: ElementName) =>
	element === 'light'
		? 'bg-yellow-200/50 dark:bg-yellow-200/20'
		: element === 'dark'
		? 'bg-purple-800/50 dark:bg-purple-800/20'
		: element === 'water'
		? 'bg-blue-500/50 dark:bg-blue-500/20'
		: element === 'fire'
		? 'bg-red-500/50 dark:bg-red-500/20'
		: element === 'nature'
		? 'bg-green-500/50 dark:bg-green-500/20'
		: 'bg-yellow-700/50 dark:bg-yellow-700/20'

export type Tower = {
	name: string
	elements: ElementName[]
	image: string
	support?: Support
	range: Range
}

export const towers: Record<ElementName, Tower[]> = {
	light: [
		{
			name: 'Light',
			elements: ['light'],
			image: Light,
			range: 1500,
		},
		{
			name: 'Atom',
			elements: ['light', 'earth'],
			image: AtomTower,
			range: 900,
		},
		{
			name: 'Lightning',
			elements: ['light', 'fire'],
			image: LightningTower,
			range: 1150,
		},
		{
			name: 'Trickery',
			elements: ['light', 'dark'],
			image: TrickeryTower,
			range: 900,
			support: 'buff',
		},
		{
			name: 'Astral',
			elements: ['light', 'dark', 'water'],
			image: AstralTower,
			range: 1500,
		},
		{
			name: 'Laser',
			elements: ['light', 'dark', 'earth'],
			image: LaserTower,
			range: 900,
		},
		{
			name: 'Nova',
			elements: ['light', 'fire', 'nature'],
			image: NovaTower,
			range: 900,
			support: 'slow',
		},
		{
			name: 'Railgun',
			elements: ['light', 'water', 'fire', 'earth'],
			image: RailgunTower,
			range: 750,
		},
		{
			name: 'Singularity',
			elements: ['light', 'dark', 'water', 'fire'],
			image: SingularityTower,
			range: 900,
		},
	],
	dark: [
		{
			name: 'Dark',
			elements: ['dark'],
			image: Darkness,
			range: 1500,
		},

		{
			name: 'Poison',
			elements: ['dark', 'water'],
			image: PoisonTower,
			range: 900,
		},
		{
			name: 'Disease',
			elements: ['dark', 'nature'],
			image: DiseaseTower,
			range: 900,
		},

		{
			name: 'Runic',
			elements: ['dark', 'fire', 'light'],
			image: RunicTower,
			range: 1150,
		},
		{
			name: 'Ethereal',
			elements: ['dark', 'nature', 'light'],
			image: EtherealTower,
			range: 1500,
		},
		{
			name: 'Jinx',
			elements: ['dark', 'fire', 'nature'],
			image: JinxTower,
			range: 900,
			support: 'amplify',
		},

		{
			name: 'Plague',
			elements: ['dark', 'water', 'nature', 'earth'],
			image: PlagueTower,
			range: 750,
		},
		{
			name: 'Doom',
			elements: ['dark', 'fire', 'nature', 'earth'],
			image: DoomTower,
			range: 750,
		},
		{
			name: 'Phantom Zone',
			elements: ['dark', 'water', 'earth', 'light'],
			image: PhantomZoneTower,
			range: 900,
		},
	],
	water: [
		{
			name: 'Water',
			elements: ['water'],
			image: Water,
			range: 900,
		},

		{
			name: 'Vapor',
			elements: ['water', 'fire'],
			image: VaporTower,
			range: 900,
		},
		{
			name: 'Ice',
			elements: ['water', 'light'],
			image: IceTower,
			range: 900,
		},
		{
			name: 'Well',
			elements: ['water', 'nature'],
			image: WellTower,
			range: 900,
			support: 'buff',
		},

		{
			name: 'Flooding',
			elements: ['water', 'nature', 'dark'],
			image: FloodingTower,
			range: 1150,
		},
		{
			name: 'Wisp',
			elements: ['water', 'nature', 'light'],
			image: WispTower,
			range: 900,
		},
		{
			name: 'Windstorm',
			elements: ['water', 'fire', 'light'],
			image: WindstormTower,
			range: 1150,
			support: 'slow',
		},
		{
			name: 'Polar',
			elements: ['water', 'earth', 'light'],
			image: PolarTower,
			range: 900,
			support: 'amplify',
		},

		{
			name: 'Tsunami',
			elements: ['water', 'fire', 'nature', 'earth'],
			image: TsunamiTower,
			range: 1150,
		},
		{
			name: 'Crystal Spire',
			elements: ['water', 'fire', 'earth', 'dark'],
			image: CrystalSpireTower,
			range: 1150,
		},
	],
	fire: [
		{
			name: 'Fire',
			elements: ['fire'],
			image: Fire,
			range: 750,
		},
		{
			name: 'Solar',
			elements: ['fire', 'nature'],
			image: SolarTower,
			range: 750,
		},
		{
			name: 'Infernal',
			elements: ['fire', 'dark'],
			image: InfernalTower,
			range: 750,
		},
		{
			name: 'Blacksmith',
			elements: ['fire', 'earth'],
			image: BlacksmithTower,
			range: 900,
			support: 'buff',
		},
		{
			name: 'Flamethrower',
			elements: ['fire', 'earth', 'dark'],
			image: FlamethrowerTower,
			range: 750,
		},
		{
			name: 'Haste',
			elements: ['fire', 'earth', 'water'],
			image: HasteTower,
			range: 900,
		},
		{
			name: 'Corrosion',
			elements: ['fire', 'dark', 'water'],
			image: CorrosionTower,
			range: 900,
			support: 'amplify',
		},
		{
			name: 'Obelisk',
			elements: ['fire', 'nature', 'light', 'water'],
			image: ObeliskTower,
			range: 900,
		},
		{
			name: 'Rage',
			elements: ['fire', 'nature', 'earth', 'light'],
			image: RageTower,
			range: 900,
		},
	],
	nature: [
		{
			name: 'Nature',
			elements: ['nature'],
			image: Nature,
			range: 750,
		},
		{
			name: 'Mushroom',
			elements: ['nature', 'earth'],
			image: MushroomTower,
			range: 750,
		},
		{
			name: 'Bloom',
			elements: ['nature', 'light'],
			image: BloomTower,
			range: 750,
		},
		{
			name: 'Impulse',
			elements: ['nature', 'water', 'fire'],
			image: ImpulseTower,
			range: 1500,
		},
		{
			name: 'Golem',
			elements: ['nature', 'earth', 'water'],
			image: GolemTower,
			range: 1150,
		},
		{
			name: 'Root',
			elements: ['nature', 'earth', 'dark'],
			image: RootTower,
			range: 900,
			support: 'slow',
		},
		{
			name: 'Incantation',
			elements: ['nature', 'earth', 'light'],
			image: IncantationTower,
			range: 900,
			support: 'amplify',
		},
		{
			name: 'Archdruid',
			elements: ['nature', 'dark', 'water', 'fire'],
			image: ArchdruidTower,
			range: 900,
		},
		{
			name: 'Tesla Tree',
			elements: ['nature', 'light', 'dark', 'water'],
			image: TeslaTreeTower,
			range: 900,
		},
		{
			name: 'Life Altar',
			elements: ['nature', 'light', 'dark', 'fire'],
			image: LifeAltarTower,
			range: 900,
		},
	],
	earth: [
		{
			name: 'Earth',
			elements: ['earth'],
			image: Earth,
			range: 900,
		},
		{
			name: 'Howitzer',
			elements: ['earth', 'dark'],
			image: HowitzerTower,
			range: 1500,
		},
		{
			name: 'Geyser',
			elements: ['earth', 'water'],
			image: GeyserTower,
			range: 750,
		},
		{
			name: 'Quake',
			elements: ['earth', 'fire', 'nature'],
			image: QuakeTower,
			range: 750,
		},
		{
			name: 'Money',
			elements: ['earth', 'light', 'fire'],
			image: MoneyTower,
			range: 1150,
		},
		{
			name: 'Muck',
			elements: ['earth', 'dark', 'water'],
			image: MuckTower,
			range: 900,
			support: 'slow',
		},
		{
			name: 'Shredder',
			elements: ['earth', 'light', 'dark', 'fire'],
			image: ShredderTower,
			range: 900,
		},
		{
			name: 'Nuclear',
			elements: ['earth', 'light', 'dark', 'nature'],
			image: NuclearReactorTower,
			range: 750,
		},
		{
			name: 'Gravity Cannon',
			elements: ['earth', 'light', 'water', 'nature'],
			image: GravityCannonTower,
			range: 1500,
		},
	],
}

export const getTowerParents = (tower: Tower) => {
	return Object.values(towers)
		.flat()
		.filter((x) => x.elements.length === tower.elements.length - 1)
		.filter((x) =>
			x.elements.reduce(
				(pass, el) => pass && tower.elements.includes(el),
				true
			)
		)
}

export const convertElementNameToSymbols = (x: ElementName) =>
	x === 'dark'
		? 'd'
		: x === 'earth'
		? 'e'
		: x === 'fire'
		? 'f'
		: x === 'light'
		? 'l'
		: x === 'nature'
		? 'n'
		: 'w'

export const convertSymbolToElementName = (x: string): ElementName | null =>
	x === 'd'
		? 'dark'
		: x === 'e'
		? 'earth'
		: x === 'f'
		? 'fire'
		: x === 'l'
		? 'light'
		: x === 'n'
		? 'nature'
		: x === 'w'
		? 'water'
		: null
