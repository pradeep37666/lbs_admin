import axios from 'axios'
import { User } from '../types/types'
import Instance from '../utils/axios'

const networkErrorMessage = 'There was an error with your connection, please try again'

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
	// export const search = async (keyword: string, nextPage: number, limit: number): Promise<ItemSearchReturn> => {
	// 	try {
	// 		const result = await Instance.get(`items/search?keyword=${keyword}&offset=${nextPage}&limit=${limit}`)

	// 		return {
	// 			...result.data,
	// 			nextPage: nextPage + limit,
	// 		}
	// 	} catch (error) {
	// 		console.log(error)
	// 		if (error && axios.isAxiosError(error)) {
	// 			if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
	// 		}

	// 		throw Error('Malformed item data')
	// 	}
	// }
}

export default UserService