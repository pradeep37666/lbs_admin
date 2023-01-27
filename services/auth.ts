import axios from 'axios'
import Instance from '../utils/axios'

const networkErrorMessage = 'There was an error with your connection, please try again'

type LoginProps = {
	email: string
	password: string
}

namespace AuthService {
	export const login = async ({ email, password }: LoginProps): Promise<any> => {
		try {
			const result = await Instance.post(`auth/admin/signIn`, {
				email,
				password,
			})

			console.log(result.data)

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
