import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type User = {
	email: string
	firstName: string
	lastName: string
	mobile: string
	avatar?: string
	id: string
}

export type Snack = {
	isOpen: boolean
	severity: 'success' | 'error'
	message?: string
}
export interface IconBaseProps {
	onClick?: () => void
	className?: string
	color?: string
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}
