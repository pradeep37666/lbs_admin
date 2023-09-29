import axios from 'axios'
import Instance from '../utils/axios'
import moment from 'moment'
import { Booking } from '../types/types'

const networkErrorMessage = 'There was an error with your connection, please try again'

export type Blog = {
    id?: string
    category: string,
    metaTitle: string,
    metaDesc: string,
    bannerTitle: string,
    contentTitle: string,
    contentBody: string,
    image: string
    isDraft?: boolean
    updatedAt?:Date

}

type UpdateBlogProps = {
	blogId: string| string[] | undefined
	blog: Partial<Blog>
}


namespace BlogService {
    export const createBlog = async (payload: Blog): Promise<any> => {
        try {
            const result = await Instance.post(`admin/blogs`, payload)
            return result.data
        } catch (error) {
            console.log(error)
            if (error && axios.isAxiosError(error)) {
                if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
            }
            throw Error('Something went wrong')
        }
    }

    export const search = async ( keyword: string, nextPage: number, limit: number,): Promise<any> => {
        let searchQuery = `keyword=${keyword}&offset=${nextPage}&limit=${limit}`
        try {
            const result = await Instance.get(`admin/blogs?${searchQuery}`)
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
            throw Error('Something went wrong')
        }
    }

    export const getBlog = async (blogId: string| undefined): Promise<Blog> => {
		try {
			const result = await Instance.get(`admin/blogs/${blogId}`)

			return result.data
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}
			throw Error('Error getting  blog')
		}
	}
    export const updateBlog = async ({ blogId, blog }: UpdateBlogProps): Promise<Blog> => {   
		try {
			const result = await Instance.patch(`admin/blogs/${blogId}`, blog)            
			return result.data
		} catch (error) {
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}
			throw Error('Error getting  blog')
		}
	}

}

export default BlogService