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

type RespondToTicketProps = {
	supportId: string
	reply: string
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

			throw Error('Error fetching support tickets')
		}
	}
	export const getByUserId = async (userId: string, nextPage: number, limit: number): Promise<SupportTicketSearchReturn> => {
		try {
			const result = await Instance.get(`admin/supports/users/${userId}?offset=${nextPage}&limit=${limit}`)

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

			throw Error('Error fetching support tickets')
		}
	}

	export const getOne = async (supportId: string): Promise<SupportTicket> => {
		try {
			const result = await Instance.get(`admin/supports/${supportId}`)

			return result.data
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Error fetching support tickets')
		}
	}

	export const respondToTicket = async ({ supportId, reply }: RespondToTicketProps): Promise<boolean> => {
		try {
			const result = await Instance.put(`admin/supports/${supportId}`, { reply })
			return true
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Error responding to ticket')
		}
	}
	export const dismissTicket = async (supportId: string): Promise<boolean> => {
		try {
			await Instance.delete(`admin/supports/${supportId}`)
			return true
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Error dismissing ticket')
		}
	}
}

export default SupportTicketService
