import { atom } from 'jotai'
import { Admin, Snack ,Blog } from '../types/types'

const defaultSnack: Snack = {
	isOpen: false,
	message: '',
	severity: 'success',
}

export const snackAtom = atom<Snack>(defaultSnack)

export const adminAtom = atom<Admin | undefined>(undefined)
export const blogAtom = atom<Blog | undefined>(undefined)
