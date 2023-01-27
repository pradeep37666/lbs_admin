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

export type Admin = {
	avatar: string
	createdAt: string
	customerId: string | null
	email: string
	firstName: string
	id: string
	lastName: string
	role: 'ADMIN'
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

export type Tab = {
	name: string
	value: string
}
