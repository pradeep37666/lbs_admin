import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import UserService from '../services/users'
import { snackAtom } from '../stores/atoms'
import errorPopupParser from '../utils/error-popup-parser'
import getItemsFromPagination from '../utils/get-items-from-pagination'
import useDebounce from '../utils/use-debounce'
import UserCard from './cards/user-card'
import SearchInput from './core/search-input'

const NUM_ITEMS_PER_SEARCH = 15

type Props = {
	setActiveUserId: (activeUserId: string | undefined) => void
	activeUserId: string | undefined
}

function UserList({ setActiveUserId, activeUserId }: Props) {
	const [, setSnack] = useAtom(snackAtom)

	const [keyword, setKeyword] = useState('')

	const debouncedKeyword = useDebounce(keyword, 600)

	const {
		data: usersPaginated,
		isFetching: usersIsFetching,
		fetchNextPage: fetchNextUsers,
	} = useInfiniteQuery(
		['users', debouncedKeyword],
		({ pageParam = 0 }) => UserService.search(debouncedKeyword, pageParam, NUM_ITEMS_PER_SEARCH),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.nextPage
			},
			onError: (err) => errorPopupParser(err, setSnack),
		}
	)

	const loadMoreItems = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const hasHitBottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 200
		if (!usersPaginated || !hasHitBottom) return

		const { data, total } = getItemsFromPagination(usersPaginated.pages)

		if (usersIsFetching || data.length >= total) return

		if (hasHitBottom) fetchNextUsers()
	}

	const renderUsers = () => {
		if (!usersPaginated) return <div className='ml-4'> No users found!</div>

		return getItemsFromPagination(usersPaginated.pages)?.data.map((user, index) => {
			return <UserCard user={user} isActive={activeUserId === user.id} key={index} setActiveUser={() => setActiveUserId(user.id)} />
		})
	}

	return (
		<div className='bg-white border-[1px] border-grey-border rounded-xl w-[30%] min-w-[320px] h-full overflow-hidden'>
			<div className='flex gap-4 p-4 items-center'>
				<p className='text-[20px] text-blue-dark'>Users</p>
			</div>

			<div className='px-4 mb-2'>
				<SearchInput value={keyword} onChange={setKeyword} placeholder='Search' />
			</div>

			<div className='overflow-auto h-[calc(100%_-_120px)] hide-scroll' onScroll={(e) => loadMoreItems(e)}>
				{renderUsers()}
			</div>
		</div>
	)
}

export default UserList
