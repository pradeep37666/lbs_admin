import Head from 'next/head'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../types/types'

const Home: NextPageWithLayout = () => {
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
