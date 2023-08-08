import { useRouter } from 'next/router'
import React from 'react'
import Star from '../../assets/icons/star'
import { User } from '../../types/types'
import getImage from '../../utils/getImage'
import ItemPlaceholder from '../../assets/images/item-placeholder.png'
import Button from '../core/button'

type Props = {
	user?: User
	isViewProfileButtonShown?: boolean
}

function UserProfileCard({ user, isViewProfileButtonShown }: Props) {
	const router = useRouter()

	const getUserImage = () => {
		if (user?.avatar) return getImage(user.avatar)
		else return ItemPlaceholder.src
	}

	return (
		<div className='flex border rounded-xl border-grey-border p-4 justify-between items-center mb-4'>
			<div className='flex items-center gap-3 text-[20px]'>
				<img src={getUserImage()} className='w-[45px] h-[45px] rounded-[50%] object-cover' />
				<p className='font-bold'>{user?.firstName + ' ' + user?.lastName}</p>
				<p>B: {user?.borrowerRating}/5</p>
				<Star />

				{user?.isLender && user.lenderRating && (
					<>
						<p>L: {user?.lenderRating}/5</p>
						<Star />
					</>
				)}
			</div>

			{isViewProfileButtonShown && <Button text='View Profile' onClick={() => router.push(`users?id=${user?.id}`)} className='btn-white' />}
		</div>
	)
}

export default UserProfileCard
