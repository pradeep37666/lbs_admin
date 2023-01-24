import axios from "axios"
import asyncTimeout from "../utils/async-timeout"
import Instance from "../utils/axios"

const networkErrorMessage = 'There was an error with your connection, please try again'

type Pokemon = {
    url: string
    name: string
}

namespace ExampleService {
    export const getPokemon = async (page: number): Promise<Pokemon[]> => {
        try {

            const randomStart = Math.floor(Math.random() * 600)

            const result = await Instance.get(`/pokemon/?limit=20&offset=${1 * (page * 20)}`)

            return result.data.results
        } catch (error) {
            console.log(error)
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') throw Error(networkErrorMessage)
			}

			throw Error('Something went wrong, double check your details and try again')
        }
    }

    export const updatePokemon = async (message: string): Promise<string> => {
        await asyncTimeout(2000)

        console.log(message)

        return 'done'
    }
}


export default ExampleService