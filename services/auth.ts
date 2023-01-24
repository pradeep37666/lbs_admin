import { User } from '../types/types'

namespace AuthService {
	export const createOne = async (): Promise<User> => {
		// register a user
		throw Error('Not Implemented')
	}

	export const getOne = async (): Promise<User> => {
		// get a user's details
		throw Error('Not Implemented')
	}

	export const updateOne = async (): Promise<User> => {
		// update a user

		throw Error('Not Implemented')
	}

	export const deleteOne = async () => {
		// delete a user
		throw Error('Not Implemented')
	}

	export const getMe = async (): Promise<User | undefined> => {
		// get currently logged in user
		throw Error('Not Implemented')
	}
}

export default AuthService
