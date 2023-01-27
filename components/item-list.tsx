import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import ItemsIcon from '../assets/icons/items'
import ItemsService, { ItemSearchReturn } from '../services/items'
import { snackAtom } from '../stores/atoms'
import { Item } from '../types/items'
import { Tab } from '../types/types'
import errorPopupParser from '../utils/error-popup-parser'
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

	const lazyItems = useInfiniteQuery(
		['items', debouncedKeyword],
		({ pageParam = 0 }) => ItemsService.search(debouncedKeyword, pageParam, NUM_ITEMS_PER_SEARCH),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.nextPage
			},
			onError: (err) => errorPopupParser(err, setSnack),
		}
	)

	const getAllItems = (itemSearchResults: ItemSearchReturn[] | undefined): { items: Item[]; numItems: number } => {
		if (!itemSearchResults)
			return {
				items: [],
				numItems: 0,
			}

		const fullItemList: Item[] = []
		let count = 0
		itemSearchResults.forEach((page) => {
			count = page.count
			page.data.forEach((item) => {
				fullItemList.push(item)
			})
		})

		return {
			items: fullItemList,
			numItems: count,
		}
	}

	const loadMoreItems = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const hasHitBottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 200
		if (!lazyItems.data || !hasHitBottom) return

		const { items, numItems } = getAllItems(lazyItems.data.pages)

		if (lazyItems.isFetching || items.length >= numItems) return

		if (hasHitBottom) lazyItems.fetchNextPage()
	}

	const renderItems = () => {
		if (!lazyItems.data) return <div> No items found!</div>

		return getAllItems(lazyItems.data.pages)?.items.map((item, index) => {
			return <ItemCard item={item} isActive={activeItem === item} key={index} setActiveItem={setActiveItem} />
		})
	}

	return (
		<div className='bg-white border-[1px] border-grey-border rounded-xl w-[30%] min-w-[320px] h-full overflow-hidden'>
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
