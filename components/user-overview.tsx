import React, { useState } from 'react'
import Star from '../assets/icons/star'
import getImage from '../utils/getImage'
import Button from './core/button'
import ItemPlaceholder from '../assets/images/item-placeholder.png'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query'
import UserService from '../services/users'
import errorPopupParser from '../utils/error-popup-parser'
import { useAtom } from 'jotai'
import { snackAtom } from '../stores/atoms'
import ContactUserModal from './modals/contact-user-modal'
import Switch from './core/switch'
import ItemsService from '../services/items'
import UserItems from './user-items'
import getItemsFromPagination from '../utils/get-items-from-pagination'
import SupportTicketService from '../services/support-tickets'
import UserSupportTickets from './user-support-tickets'
import Spinner from '../assets/icons/spinner'
import UserDisputes from './user-disputes'
import DisputeService from '../services/disputes'
import UserProfileCard from './cards/user-profile-card'

type Props = {
	userId: string
}
const NUM_ITEMS_PER_SEARCH = 15

type UserTabs = 'Items' | 'Disputes' | 'Support'

function UserOverview({ userId }: Props) {
	const [, setSnack] = useAtom(snackAtom)
	const [isContactUserModalOpen, setIsContactUserModalOpen] = useState(false)
	const [activeTab, setActiveTab] = useState<UserTabs>('Items')
	const queryClient = useQueryClient()

	const { data: user, isLoading: isLoadingUser } = useQuery(['singleUser', userId], () => UserService.getOne(userId), {
		onError: (err) => errorPopupParser(err, setSnack),
	})

	const { data: userPaginatedTickets } = useInfiniteQuery(
		['userTickets', userId, activeTab],
		({ pageParam = 0 }) => SupportTicketService.getByUserId(userId, pageParam, NUM_ITEMS_PER_SEARCH),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.nextPage
			},
			onError: (err) => errorPopupParser(err, setSnack),
		}
	)

	const { data: userPaginatedItems } = useInfiniteQuery(
		['userItems', userId, activeTab],
		({ pageParam = 0 }) => ItemsService.getUserItems(pageParam, NUM_ITEMS_PER_SEARCH, userId),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.nextPage
			},
			onError: (err) => errorPopupParser(err, setSnack),
		}
	)

	const { mutate: setUserIsRestricted, isLoading: isLoadingBanUnban } = useMutation(UserService.updateUser, {
		onError: (err) => errorPopupParser(err, setSnack),
		onSuccess: () => {
			queryClient.invalidateQueries(['singleUser'])
		},
	})

	const getUserImage = () => {
		if (user?.avatar) return getImage(user.avatar)
		else return ItemPlaceholder.src
	}

	const toggleUserBanned = () => {
		if (!user) return
		setUserIsRestricted({ userId: user.id, newUser: { isRestricted: !user?.isRestricted } })
	}

	const renderUserTabContent = () => {
		switch (activeTab) {
			case 'Items':
				return <UserItems items={getItemsFromPagination(userPaginatedItems?.pages).data} />
			case 'Disputes':
				return <div />
			// return <UserDisputes disputes={getItemsFromPagination} />
			case 'Support':
				return <UserSupportTickets tickets={getItemsFromPagination(userPaginatedTickets?.pages).data} />
		}
	}

	const renderUserDetails = () => {
		if (isLoadingUser) return <div className='w-full h-20 animate-pulse bg-grey-base rounded-lg ' />
		else return <UserProfileCard user={user} />
	}

	return (
		<div className='bg-white border-[1px] border-grey-border rounded-xl flex-grow h-full overflow-auto hide-scroll p-4 max-w-[64%]'>
			<ContactUserModal
				isOpen={isContactUserModalOpen}
				onClose={() => setIsContactUserModalOpen(false)}
				user={user}
				userImage={getUserImage()}
			/>

			<div className='flex justify-between items-center'>
				<p className='text-[20px] text-blue-dark'>User Overview</p>
				<div className='flex gap-2 w-fit'>
					<Button
						text='Contact User'
						onClick={() => setIsContactUserModalOpen(true)}
						className='py-1 rounded-md text-white bg-blue-dark border-blue-dark border-2 font-bold w-fit hover:bg-blue-dark'
					/>
				</div>
			</div>

			<div className='border-b-[1px] border-grey-border mt-4 mb-6 mx-4' />

			{renderUserDetails()}

			<div className='border-b-[1px] border-grey-border my-6 mx-4' />

			<div className='flex items-center gap-8 pr-8'>
				<div>
					<p className='font-bold'>Ban This User</p>
					<p>By banning this user they will not be able to access their Little Big Shed account, until un-banned.</p>
				</div>
				{isLoadingBanUnban ? <Spinner /> : <Switch onChange={toggleUserBanned} value={user?.isRestricted ?? false} />}
			</div>

			<div className='border-b-[1px] border-grey-border my-6 mx-4' />

			<div className='flex gap-4 items-center'>
				<Button text='Items' onClick={() => setActiveTab('Items')} className={`${activeTab === 'Items' ? 'btn-blue' : 'btn-white'}`} />
				<Button text='Support' onClick={() => setActiveTab('Support')} className={`${activeTab === 'Support' ? 'btn-blue' : 'btn-white'}`} />
				<Button text='Disputes' onClick={() => setActiveTab('Disputes')} className={`${activeTab === 'Disputes' ? 'btn-blue' : 'btn-white'}`} />
			</div>
			<div className='border-b-[1px] border-grey-border my-6 mx-4' />
			{renderUserTabContent()}
		</div>
	)
}

export default UserOverview
