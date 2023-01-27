import Head from 'next/head'
import React, { ReactElement, useState } from 'react'
import PageWrapper from '../../components/core/page-wrapper'
import ItemList from '../../components/item-list'
import { Item } from '../../types/items'

function Items() {
	const [activeItem, setActiveItem] = useState<Item>()

	return (
		<div className='w-full h-full select-none overflow-hidden'>
			<p className='text-blue-dark h-[45px] text-[30px] font-bold mb-4'>Items</p>

			<div className='w-full h-[calc(100%_-_65px)] flex gap-4'>
				<ItemList setActiveItem={setActiveItem} activeItem={activeItem} />
				{/* <ItemOverview item={activeItem}/> */}
			</div>
		</div>
	)
}

Items.getLayout = function getLayout(page: ReactElement) {
	return (
		<PageWrapper>
			<Head>
				<title>Items</title>
			</Head>

			{page}
		</PageWrapper>
	)
}

export default Items
