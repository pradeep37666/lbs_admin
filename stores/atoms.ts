import { atom } from 'jotai'
import { Admin, Snack } from '../types/types'

const defaultSnack: Snack = {
	isOpen: false,
	message: '',
	severity: 'success',
}

export const snackAtom = atom<Snack>(defaultSnack)

export const adminAtom = atom<Admin | undefined>(undefined)
