import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import ItemsIcon from '../assets/icons/items'
import ItemsService from '../services/items'
import { snackAtom } from '../stores/atoms'
import { Item } from '../types/items'
import { Tab } from '../types/types'
import errorPopupParser from '../utils/error-popup-parser'
import getItemsFromPagination from '../utils/get-items-from-pagination'
import useDebounce from '../utils/use-debounce'
import ItemCard from './cards/item-card'
import SearchInput from './core/search-input'
import Tabs from './core/tabs'

const NUM_ITEMS_PER_SEARCH = 15
const searchTabs = [
	{ name: 'All', value: 'All' },
	{ name: '24hrs', value: '24' },
	{ name: '48hrs', value: '48' },
]

type Props = {
	setActiveItem: (activeItem: Item | undefined) => void
	activeItem: Item | undefined
}

function ItemList({ setActiveItem, activeItem }: Props) {
	const [, setSnack] = useAtom(snackAtom)

	const [keyword, setKeyword] = useState('')
	const [activeTab, setActiveTab] = useState<Tab>(searchTabs[0])

	const debouncedKeyword = useDebounce(keyword, 600)

	const {
		data: itemsPaginated,
		isFetching: itemsIsFetching,
		fetchNextPage: fetchNextItems,
	} = useInfiniteQuery(
		['items', debouncedKeyword, activeTab],
		({ pageParam = 0 }) => ItemsService.search(debouncedKeyword, pageParam, NUM_ITEMS_PER_SEARCH, activeTab.value),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.nextPage
			},
			onError: (err) => errorPopupParser(err, setSnack),
		}
	)

	const loadMoreItems = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const hasHitBottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 200
		if (!itemsPaginated || !hasHitBottom) return

		const { data, total } = getItemsFromPagination(itemsPaginated.pages)

		if (itemsIsFetching || data.length >= total) return

		if (hasHitBottom) fetchNextItems()
	}

	const renderItems = () => {
		if (!itemsPaginated) return <div> No items found!</div>
		return getItemsFromPagination(itemsPaginated.pages)?.data.map((item, index) => {
			return <ItemCard item={item} isActive={activeItem === item} key={index} setActiveItem={setActiveItem} />
		})
	}

	return (
		<div className='bg-white border-[1px] border-grey-border rounded-xl min-w-[360px] h-full overflow-hidden'>
			<div className='flex gap-4 p-4 items-center'>
				<ItemsIcon />
				<p className='text-[20px] text-blue-dark'>All Items</p>

				<div className='ml-auto'>
					<Tabs tabs={searchTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
				</div>
			</div>

			<div className='px-4 mb-2'>
				<SearchInput value={keyword} onChange={setKeyword} placeholder='Search' />
			</div>

			<div className='overflow-auto h-[calc(100%_-_120px)] hide-scroll' onScroll={(e) => loadMoreItems(e)}>
				{renderItems()}
			</div>
		</div>
	)
}

export default ItemList
