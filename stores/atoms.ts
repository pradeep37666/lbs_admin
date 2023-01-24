import { atom } from 'jotai'
import { Snack, User } from '../types/types'

const defaultSnack: Snack = {
	isOpen: false,
	message: '',
	severity: 'success',
}

export const snackAtom = atom<Snack>(defaultSnack)

export const userAtom = atom<User | undefined>(undefined)
