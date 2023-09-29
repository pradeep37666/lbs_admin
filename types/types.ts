import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { Item } from './items'

export type User = {
	email: string
	firstName: string
	lastName: string
	mobile: string
	avatar?: string
	id: string
	borrowerRating: number
	lenderRating: number
	isLender: boolean
	isDeleted: boolean
	isRestricted: boolean
}

export type Review = {
	bookingId: string
	comment: string
	createdAt: string
	id: string
	itemId: string
	rating: number
	updatedAt: string
	user: User
}

export type SupportTicket = {
	subject: string
	message: string
	userId: string
	reply?: string
	id: string
}

export type Booking = {
	bookingDurations: BookingDuration[]
	bookingEvents: BookingEvent[]
	borrower: User
	borrowerId: string
	createdAt: string
	deliveryOption: string
	deliveryPrice: number
	disputes: Dispute[]
	id: string
	item: Item
	itemId: string
	pickupPrice: number
	status: string
	updatedAt: string
}

export type BookingDuration = {
	bookingId: string
	createdAt: string
	endDate: string
	id: string
	itemPrice: number
	startDate: string
	status: BOOKING_EVENTS
	stripeChargeId?: string
	totalPrice: number
	updatedAt: string
}

export enum BOOKING_EVENTS {
	APPLIED = 'APPLIED',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
	CANCELLED = 'CANCELLED',
	TO_RESCHEDULE = 'TO_RESCHEDULE',
	IN_PROGRESS = 'IN_PROGRESS',
	ENDED = 'ENDED',
	LENDER_CONFIRMED = 'LENDER_CONFIRMED',
	BORROWER_CONFIRMED = 'BORROWER_CONFIRMED',
	BORROWER_REVIEWED = 'BORROWER_REVIEWED',
	LENDER_REVIEWED = 'LENDER_REVIEWED',
	EXTENSION_REQUESTED = 'EXTENSION_REQUESTED',
	EXTENSION_APPROVED = 'EXTENSION_APPROVED',
	EXTENSION_REJECTED = 'EXTENSION_REJECTED',
	EXTENSION_CANCELLED = 'EXTENSION_CANCELLED',
	DISPUTED = 'DISPUTED',
	RESOLVED = 'RESOLVED',
}

// export type BookingEventStatus = 'APPLIED' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'TO_RESCHEDULE' | 'IN_PROGRESS' | 'ENDED'

export type BookingEvent = {
	bookingId: string
	createdAt: string
	event: BOOKING_EVENTS
	id: string
	updatedAt: string
}

export type Dispute = {
	bookingId: string
	createdAt: string
	disputee: User
	disputer: User
	id: string
	isResolved: boolean
	updatedAt: string
	events: DisputeEvent[]
}

export type DisputeEvent = {
	name: string
	status: 'Complete' | 'Failed' | 'Upcoming'
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

export type publishBlog = {
	id: string
	draft:boolean
}