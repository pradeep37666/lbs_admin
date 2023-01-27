import axios from 'axios'
import { Item } from '../types/items'
import Instance from '../utils/axios'

const networkErrorMessage = 'There was an error with your connection, please try again'

export type ItemSearchReturn = {
	data: Item[]
	count: number
	nextPage: number
}

namespace ItemsService {
	export const search = async (keyword: string, nextPage: number, limit: number): Promise<ItemSearchReturn> => {
		try {
			const result = await Instance.get(`items/search?keyword=${keyword}&offset=${nextPage}&limit=${limit}`)

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

			throw Error('Malformed item data')
		}
	}
}

export default ItemsService
