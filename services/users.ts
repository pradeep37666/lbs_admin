import axios from 'axios'
import { User } from '../types/types'
import Instance from '../utils/axios'

const networkErrorMessage = 'There was an error with your connection, please try again'

type ContactUserProps = {
	userId: string
	subject: string
	message: string
}

export type UserSearchResult = {
	data: User[]
	count: number
	nextPage: number
}

namespace UserService {
	export const getOne = async (id: string): Promise<User> => {
		try {
			const result = await Instance.get(`users/${id}`)

			return result.data
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('User not found')
		}
	}

	export const getReviews = async (id: string): Promise<User> => {
		try {
			const result = await Instance.get(`users/${id}/item-ratings`)

			return result.data
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('User reviews not found')
		}
	}

	export const contactUser = async ({ userId, subject, message }: ContactUserProps): Promise<boolean> => {
		try {
			const result = await Instance.post(`admin/users/${userId}/contact`, {
				subject,
				message,
			})

			return true
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Could not send user email')
		}
	}
	export const search = async (keyword: string, nextPage: number, limit: number): Promise<UserSearchResult> => {
		try {
			let searchQuery = `keyword=${keyword}&offset=${nextPage}&limit=${limit}`

			const result = await Instance.get(`admin/users/list?${searchQuery}`)

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

			throw Error('Error fetching user data.')
		}
	}
}

export default UserService
