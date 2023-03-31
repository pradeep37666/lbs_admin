import axios from 'axios'
import { Admin } from '../types/types'
import Instance from '../utils/axios'

const networkErrorMessage = 'There was an error with your connection, please try again'

type LoginProps = {
	email: string
	password: string
}

type AdminLoginResult = {
	token: {
		expiresIn: number
		accessToken: string
	}
	user: Admin
}

namespace AuthService {
	export const login = async ({ email, password }: LoginProps): Promise<AdminLoginResult> => {
		try {
			const result = await Instance.post(`auth/admin/signIn`, {
				email,
				password,
			})

			return result.data
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Incorrect login details')
		}
	}

	export const getMe = async (): Promise<Admin> => {
		try {
			const result = await Instance.get(`admin/users/profile/me`)

			return result.data
		} catch (error) {
			console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Malformed item data')
		}
	}
}

export default AuthService
