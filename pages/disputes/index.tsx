import Head from 'next/head'
import React, { ReactElement } from 'react'
import PageWrapper from '../../components/core/page-wrapper'

function Disputes() {
	return (
		<div className='w-full h-full select-none overflow-hidden'>
			<p className='text-blue-dark h-[45px] text-[30px] font-bold mb-4'>Disputes</p>

			<div className='w-full h-[calc(100%_-_65px)] flex gap-4'>
				{/* <ItemList setActiveItem={setActiveItem} activeItem={activeItem} />
		{activeItem && <ItemOverview item={activeItem} />} */}
			</div>
		</div>
	)
}

Disputes.getLayout = function getLayout(page: ReactElement) {
	return (
		<PageWrapper>
			<Head>
				<title>Disputes</title>
			</Head>

			{page}
		</PageWrapper>
	)
}

export default Disputes
