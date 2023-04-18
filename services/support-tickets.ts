import axios from 'axios'
import Instance from '../utils/axios'
import moment from 'moment'
import { SupportTicket } from '../types/types'

const networkErrorMessage = 'There was an error with your connection, please try again'

export type SupportTicketSearchReturn = {
	data: SupportTicket[]
	count: number
	nextPage: number
}

namespace SupportTicketService {
	export const search = async (keyword: string, nextPage: number, limit: number, createdAt: string): Promise<SupportTicketSearchReturn> => {
		try {
			let searchQuery = `keyword=${keyword}&offset=${nextPage}&limit=${limit}`

			if (createdAt === '24' || createdAt === '48') {
				const itemCreatedAfter = moment().subtract(parseInt(createdAt), 'hours').toISOString()
				searchQuery += `&createdAt=${itemCreatedAfter}`
			}

			const result = await Instance.get(`admin/supports?${searchQuery}`)

			console.log(result)

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
}

export default SupportTicketService
