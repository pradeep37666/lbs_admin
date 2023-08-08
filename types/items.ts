import { User } from './types'

export type ItemImage = {
	id: string
	createdAt: Date
	updatedAt: Date
	itemId: string
	imageKey: string
}

export type ItemAddress = {
	id: string
	createdAt: Date
	updatedAt: Date
	streetNumber: string
	streetName: string
	city: string
	suburb: string
	state: string
	postCode: string
	country: string
	fullAddress: string
	lat: number
	lng: number
	itemId?: string
}

export type Item = {
	id: string
	createdAt: Date
	updatedAt: Date
	title: string
	category: string
	description: string
	price: number
	deliveryPrice: number
	pickupPrice: number
	rating: number
	discount: number
	weekly_availability: string
	is_deleted: boolean
	deliveryOption: DeliveryOption
	userId: string
	user: User
	images: ItemImage[]
	address: ItemAddress
	availabilities: ItemAvailability[]
}

export type ItemAvailability = {
	id: string
	createdAt: Date
	updatedAt: Date
	yearly_availability: string
	year: number
	itemId: string
}

export type ItemCreated = {
	userId: {
		id: string
		email: string
		exp: number
		role: string
	}
	title: string
	category: string
	description: string
	price: number
	deliveryPrice: number
	discount: number
	is_deleted: boolean
	images: ItemImage[]
	address: ItemAddress
	id: string
	createdAt: Date
	updatedAt: Date
	rating: number
	weekly_availability: string
}

export type DeliveryOption = 'DELIVERY' | 'PICKUP' | 'BOTH' | 'NONE'
