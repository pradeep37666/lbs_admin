import React, { useState } from 'react'
import Button from './core/button'
import { useQuery, useQueryClient } from 'react-query'
import { useAtom } from 'jotai'
import { snackAtom } from '../stores/atoms'
import UserProfileCard from './cards/user-profile-card'
import LendingTimeline from './lending-timeline'
import { DisputeEvent, User } from '../types/types'
import DisputeService from '../services/disputes'
import errorPopupParser from '../utils/error-popup-parser'
import getImage from '../utils/getImage'
import ItemPlaceholder from '../assets/images/item-placeholder.png'
import ItemsService from '../services/items'
import Spinner from '../assets/icons/spinner'
import Star from '../assets/icons/star'
import Delivery from '../assets/icons/delivery'
import DisputeItemCosts from './dispute-item-costs'
import DisputeItemDates from './dispute-item-dates'
import EndDisputeModal from './modals/end-dispute-modal'
import Image from "next/image";


type Props = {
	disputeId: string
}

const placeholderEvents: DisputeEvent[] = [
	{
		name: 'Lend Application',
		status: 'Complete',
	},
	{
		name: 'Lend Approved',
		status: 'Complete',
	},
	{
		name: 'Item Collected',
		status: 'Failed',
	},
	{
		name: 'Item Brought Back',
		status: 'Upcoming',
	},
	{
		name: 'Trade Complete',
		status: 'Upcoming',
	},
]
function DisputeOverview({ disputeId }: Props) {
	const [, setSnack] = useAtom(snackAtom)
	const [isEndDisputeModalOpen, setIsEndDisputeModalOpen] = useState(false)

	const { data: booking, isLoading: bookingIsLoading } = useQuery(['singleDispute', disputeId], () => DisputeService.getOne(disputeId), {
		onError: (err) => errorPopupParser(err, setSnack),
	})

	const { data: item, isLoading: itemIsLoading } = useQuery(
		['singleDisputeItem', disputeId],
		() => ItemsService.getOne(booking?.itemId ?? ''),
		{
			onError: (err) => errorPopupParser(err, setSnack),
			enabled: !!booking,
		}
	)

	const getItemImage = (imageKey: string | undefined) => {
		if (imageKey) return getImage(imageKey)
		else return ItemPlaceholder.src
	}

	if (!booking || bookingIsLoading)
		return (
			<div>
				<Spinner />
			</div>
		)

	const dispute = booking.disputes[0]

	const renderItem = () => {
		if (!item || itemIsLoading) return <div>Item not found</div>

		return (
			<div className='flex gap-4'>
				<Image src={getItemImage(item.images[0]?.imageKey)} width={84} height={84} className='w-[84px] h-[84px] rounded-lg object-cover' alt=''/>
				<div>
					<p className='font-bold text-[20px]'>{item?.title}</p>
					<p className='text-red-base text-[18px]'>${item.price}</p>
					<div className='flex items-center gap-3'>
						<p>{item.rating}/5</p>
						<Star />
					</div>
				</div>
			</div>
		)
	}

	const renderUsers = () => {
		if (!booking) return <div></div>

		const users = [booking.disputes[0].disputee, booking.disputes[0].disputer]

		const lender = users.find((user) => user !== booking.borrower)
		return (
			<div>
				<p className='text-[14px] mb-2'>Lender</p>

				<UserProfileCard user={lender} isViewProfileButtonShown />

				<p className='text-[14px] mb-2'>Borrower</p>
				<UserProfileCard user={booking.borrower} isViewProfileButtonShown />
			</div>
		)
	}

	return (
		<div className='bg-white border-[1px] border-grey-border rounded-xl flex-grow h-full overflow-auto hide-scroll p-4 max-w-[64%]'>
			<EndDisputeModal
				bookingId={booking.id}
				isOpen={isEndDisputeModalOpen}
				onClose={() => setIsEndDisputeModalOpen(false)}
				onDismiss={() => null}
			/>

			<div className='flex justify-between items-center'>
				<p className='text-[20px] text-blue-dark'>Dispute Overview</p>
				<div className='flex gap-2 w-fit'>
					<Button text='End Dispute' onClick={() => setIsEndDisputeModalOpen(true)} className='btn-white' />
				</div>
			</div>

			<div className='border-b-[1px] border-grey-border mt-4 mb-6 mx-4' />

			<h1 className='font-bold text-[20px] mb-2'>Lending Users</h1>

			{renderUsers()}

			<div className='border-b-[1px] border-grey-border my-6 mx-4' />

			<LendingTimeline events={booking.bookingEvents} />

			<div className='p-2 bg-grey-base rounded-md text-[14px] mb-8 bg-opacity-20'>
				<span className='font-bold'>{dispute?.disputer.firstName + ' ' + dispute?.disputer.lastName}</span> has disputed that{' '}
				<span className='font-bold'>{dispute?.disputee.firstName + ' ' + dispute?.disputee.lastName}</span> has not followed the LBS process.
			</div>

			<div className='border-b-[1px] border-grey-border my-6 mx-4' />

			<h1 className='font-bold text-[20px] mb-2'>Lent Item</h1>

			{renderItem()}

			<div className='border-b-[1px] border-grey-border my-6 mx-4' />

			<div className='grid grid-cols-2 gap-8 mb-6'>
				<DisputeItemCosts item={item} itemIsLoading={itemIsLoading} />
				<DisputeItemDates bookingDuration={booking.bookingDurations[0]} bookingIsLoading={bookingIsLoading} />
			</div>

			<div>
				<h1 className='font-bold text-[20px] mb-2'>Location</h1>
				<p>{item && item.address.fullAddress}</p>
			</div>
		</div>
	)
}

export default DisputeOverview
