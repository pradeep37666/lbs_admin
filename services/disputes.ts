import axios from 'axios'
import Instance from '../utils/axios'
import moment from 'moment'
import { Booking } from '../types/types'

const networkErrorMessage = 'There was an error with your connection, please try again'

export type DisputesSearchReturn = {
	data: Booking[]
	count: number
	nextPage: number
}

namespace DisputeService {
	export const search = async (keyword: string, nextPage: number, limit: number, createdAt: string): Promise<DisputesSearchReturn> => {
		try {
			let searchQuery = `keyword=${keyword}&offset=${nextPage}&limit=${limit}`

			if (createdAt === '24' || createdAt === '48') {
				const itemCreatedAfter = moment().subtract(parseInt(createdAt), 'hours').toISOString()
				searchQuery += `&createdAt=${itemCreatedAfter}`
			}

			const result = await Instance.get(`admin/bookings/disputes?${searchQuery}`)

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

			throw Error('Error fetching booking disputes')
		}
	}
	export const getOne = async (bookingId: string): Promise<Booking> => {
		try {
			const result = await Instance.get(`admin/bookings/${bookingId}`)

			return result.data
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Error fetching booking disputes')
		}
	}

	export const endDispute = async (bookingId: string): Promise<Boolean> => {
		try {
			await Instance.patch(`admin/booking-disputes/${bookingId}?isResolved=TRUE`)

			return true
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Error updating dispute status')
		}
	}
}

export default DisputeService
