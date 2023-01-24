import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Button from '../../components/core/button'
import ExampleService from '../../services/example'

function Example() {

    const [page, setPage] = useState(0)

    const pokemon = useQuery(['pokemon', page], () => ExampleService.getPokemon(page))

    const renderPokemon = () => {
        return pokemon.data?.map((poke, index) => {
            return <div className='text-white' key={index}>
                <p>{poke.name}</p>
                <p>{poke.url}</p>
            </div>
        })
    }

    if (pokemon.isLoading) return <div>Loading...</div>

    const incrementPage = () => {
        setPage(page + 1)
    }

    const decrementPage = () => {
        if (page === 0 ) return
        setPage(page - 1)
    }
    

  return (
    <div className='bg-black w-full h-full justify-center items-center'>

        <div className='flex gap-12 items-center'>
            <div>
                <div className='text-white text-[48px]'>Show them pokes:</div>
                <div>
                    {renderPokemon()}

                </div>

            </div>

            <Button text='Prev' onClick={() => decrementPage()} className=' h-min my-12'/>
            <Button text='Next' onClick={() => incrementPage()} className=' h-min my-12'/>
            
            <p className='text-white'>Page: {page}</p>
        </div>

    </div>
  )
}

export default Example