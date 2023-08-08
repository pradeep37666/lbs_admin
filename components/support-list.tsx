import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import SupportTicketService from '../services/support-tickets'
import { snackAtom } from '../stores/atoms'
import { Tab } from '../types/types'
import errorPopupParser from '../utils/error-popup-parser'
import getItemsFromPagination from '../utils/get-items-from-pagination'
import useDebounce from '../utils/use-debounce'
import SupportTicketCard from './cards/support-ticket-card'
import SearchInput from './core/search-input'
import Tabs from './core/tabs'

const NUM_ITEMS_PER_SEARCH = 15
const searchTabs = [
	{ name: 'All', value: 'All' },
	{ name: '24hrs', value: '24' },
	{ name: '48hrs', value: '48' },
]

type Props = {
	setActiveSupportTicketId: (id: string | undefined) => void
	activeSupportTicketId: string | undefined
}

function SupportList({ setActiveSupportTicketId, activeSupportTicketId }: Props) {
	const [, setSnack] = useAtom(snackAtom)

	const [keyword, setKeyword] = useState('')
	const [activeTab, setActiveTab] = useState<Tab>(searchTabs[0])

	const debouncedKeyword = useDebounce(keyword, 600)

	const {
		data: ticketsPaginated,
		isFetching: ticketsIsFetching,
		fetchNextPage: fetchNextTickets,
	} = useInfiniteQuery(
		['supportTickets', debouncedKeyword, activeTab],
		({ pageParam = 0 }) => SupportTicketService.search(debouncedKeyword, pageParam, NUM_ITEMS_PER_SEARCH, activeTab.value),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.nextPage
			},
			onError: (err) => errorPopupParser(err, setSnack),
		}
	)

	const loadMoreItems = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const hasHitBottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 200
		if (!ticketsPaginated || !hasHitBottom) return

		const { data, total } = getItemsFromPagination(ticketsPaginated.pages)

		if (ticketsIsFetching || data.length >= total) return

		if (hasHitBottom) fetchNextTickets()
	}

	const renderItems = () => {
		if (!ticketsPaginated) return <div> No Tickets found!</div>

		return getItemsFromPagination(ticketsPaginated.pages)?.data.map((ticket, index) => {
			return (
				<SupportTicketCard
					supportTicket={ticket}
					isActive={activeSupportTicketId === ticket.id}
					key={index}
					setIsActive={() => setActiveSupportTicketId(ticket.id)}
				/>
			)
		})
	}

	return (
		<div className='bg-white border-[1px] border-grey-border rounded-xl w-[30%] min-w-[320px] h-full overflow-hidden'>
			<div className='flex gap-4 p-4 items-center'>
				<p className='text-[20px] text-blue-dark'>Support Tickets</p>

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

export default SupportList
