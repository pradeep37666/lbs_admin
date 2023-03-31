import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { NextPageWithLayout } from '../types/types'

const Home: NextPageWithLayout = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('/login')
	}, [])

	return <div className='text-white-base text-[48px]'></div>
}

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<div className='bg-black-base w-screen h-screen flex justify-center items-center'>
			<Head>
				<title>Home</title>
			</Head>

			{page}
		</div>
	)
}

export default Home
