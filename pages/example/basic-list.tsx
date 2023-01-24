import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Button from '../../components/core/button'
import ExampleService from '../../services/example'

function Example() {
	const queryClient = useQueryClient()

	const pokemon = useQuery(['pokemon'], () => ExampleService.getPokemon(0))

	const updatePokemon = useMutation(ExampleService.updatePokemon, {
		onSuccess: () => {
			console.log('RUNNING SUCCESS')
			// invalidate and refresh
			queryClient.invalidateQueries()
		},
	})

	const renderPokemon = () => {
		return pokemon.data?.map((poke, index) => {
			return (
				<div className='text-white' key={index}>
					<p>{poke.name}</p>
					<p>{poke.url}</p>
				</div>
			)
		})
	}

	if (pokemon.isLoading) return <div>Loading...</div>

	return (
		<div className='bg-black-base w-full h-full justify-center items-center'>
			<div className='flex gap-12'>
				<div>
					<div className='text-white-base text-[48px]'>Show them pokes:</div>
					<div>{renderPokemon()}</div>
				</div>

				<Button text='invalidate pokes' onClick={() => updatePokemon.mutate('here big hoss')} className=' h-min my-12' />
			</div>
		</div>
	)
}

export default Example
