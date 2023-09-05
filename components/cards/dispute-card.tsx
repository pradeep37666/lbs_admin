import React from 'react'
import { Booking } from '../../types/types'
import getImage from '../../utils/getImage'
import ItemPlaceholder from '../../assets/images/item-placeholder.png'
import Image from "next/image";

type Props = {
	booking: Booking
	isActive: boolean
	setActive: () => void
}

function DisputeCard({ booking, isActive, setActive }: Props) {
	const lowercaseStatus = booking.status.toLowerCase()

	const { borrower } = booking
	const { user: lender } = booking.item

	const getUserImage = (avatar: string | undefined) => {
		if (avatar) return getImage(avatar)
		else return ItemPlaceholder.src
	}

	return (
		<>
			<div className='border-t-2 border-grey-light mx-2' />

			<div
				className={`p-2 cursor-pointer transition-all duration-200 ${isActive ? 'bg-[#33384F1A]' : 'hover:bg-grey-light'}`}
				onClick={() => setActive()}
			>
				<div className='px-2 py-2'>
					<p className='font-bold text-[18px] text-blue-dark capitalize'>{lowercaseStatus}</p>
					<div className='flex gap-2 items-center text-[14px]'>
						<Image
							src={getUserImage(borrower.avatar)}
							width={0}
							height={0}
							className='rounded-[50%] w-[16px] h-[16px]'
							alt=''
						/>
						<p className='text-[14px] font-bold'>
							{borrower.firstName} {borrower.lastName}
						</p>
						&
						<Image
							width={0}
							height={0}
							src={getUserImage(lender.avatar)} className='rounded-[50%] w-[16px] h-[16px]' alt='' />
						<p className='text-[14px] font-bold'>
							{lender.firstName} {lender.lastName}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default DisputeCard
