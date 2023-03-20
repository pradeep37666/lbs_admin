import Head from 'next/head'
import React, { ReactElement } from 'react'
import PageWrapper from '../../components/core/page-wrapper'

function Support() {
	return (
		<div className='w-full h-full select-none overflow-hidden'>
			<p className='text-blue-dark h-[45px] text-[30px] font-bold mb-4'>Support</p>

			<div className='w-full h-[calc(100%_-_65px)] flex gap-4'>
				{/* <ItemList setActiveItem={setActiveItem} activeItem={activeItem} />
        {activeItem && <ItemOverview item={activeItem} />} */}
			</div>
		</div>
	)
}

Support.getLayout = function getLayout(page: ReactElement) {
	return (
		<PageWrapper>
			<Head>
				<title>Support</title>
			</Head>

			{page}
		</PageWrapper>
	)
}

export default Support
