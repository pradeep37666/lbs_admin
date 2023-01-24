import create from 'zustand'

type Bear = {
	color: 'black' | 'brown' | 'cinnamon' | 'blond' | 'blue-gray' | 'white'
	isFuzzy: boolean
	name: string
	isHibernating: boolean
}

interface BearState {
	bears: number
	packLeader: Bear
	reducers: BearReducers
}

interface BearReducers {
	updateLeader: (leaderDetails: Bear) => void
	increasePopulation: () => void
	deforestation: () => void
	startWinter: () => void
}

const useBearPackStore = create<BearState>((set) => ({
	bears: 5,
	packLeader: {
		color: 'brown',
		isFuzzy: true,
		name: 'Bozo',
		isHibernating: false,
	},
	reducers: {
		updateLeader: (leaderDetails) => set(() => ({ packLeader: leaderDetails })),
		increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
		deforestation: () => set({ bears: 0 }),
		startWinter: () =>
			set((state) => ({
				packLeader: {
					...state.packLeader,
					isHibernating: true,
				},
			})),
	},
}))

export function packLeaderFuzzySelector(state: BearState) {
	return state.packLeader.isFuzzy
}

export default useBearPackStore
