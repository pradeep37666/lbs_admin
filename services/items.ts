import axios from 'axios'
import { Item } from '../types/items'
import Instance from '../utils/axios'
import moment from 'moment'
import { Review } from '../types/types'

const networkErrorMessage = 'There was an error with your connection, please try again'

export type ItemSearchReturn = {
	data: Item[]
	count: number
	nextPage: number
}

namespace ItemsService {
	export const search = async (keyword: string, nextPage: number, limit: number, createdAt: string): Promise<ItemSearchReturn> => {
		try {
			let searchQuery = `keyword=${keyword}&offset=${nextPage}&limit=${limit}`

			if (createdAt === '24' || createdAt === '48') {
				const itemCreatedAfter = moment().subtract(parseInt(createdAt), 'hours').toISOString()
				searchQuery += `&createdAt=${itemCreatedAfter}`
			}

			const result = await Instance.get(`items/search?${searchQuery}`)

			if (result.data.length === 0) return result.data

			return {
				...result.data,
				nextPage: nextPage + limit,
			}
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Error fetching item data')
		}
	}
	export const getUserItems = async (nextPage: number, limit: number, userId: string): Promise<ItemSearchReturn> => {
		try {
			const result = await Instance.get(`items/search/users/${userId}?offset=${nextPage}&limit=${limit}`)

			if (result.data.length === 0) return result.data

			return {
				...result.data,
				nextPage: nextPage + limit,
			}
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Error fetching item data')
		}
	}

	export const getReviews = async (itemId: string): Promise<Review[]> => {
		try {
			const result = await Instance.get(`items/${itemId}/ratings`)

			return result.data
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Error deleting item')
		}
	}

	export const removeItem = async (itemId: string): Promise<boolean> => {
		try {
			const result = await Instance.delete(`items/${itemId}`)

			console.log(result)

			return true
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Error deleting item')
		}
	}
}

export default ItemsService
