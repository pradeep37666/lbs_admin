import { atom } from 'jotai'
import { Admin, Snack  } from '../types/types'
import { Blog } from '../services/blog'

const defaultSnack: Snack = {
	isOpen: false,
	message: '',
	severity: 'success',
}

export const snackAtom = atom<Snack>(defaultSnack)

export const adminAtom = atom<Admin | undefined>(undefined)
export const blogAtom = atom<Blog | undefined>(undefined)
