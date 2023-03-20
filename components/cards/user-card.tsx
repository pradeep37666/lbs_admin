import React from 'react'
import moment from 'moment'
import ItemPlaceholder from '../../assets/images/item-placeholder.png'
import getImage from '../../utils/getImage'
import { User } from '../../types/types'

type Props = {
	user: User
	isActive: boolean
	setActiveUser: () => void
}

function UserCard({ user, isActive, setActiveUser }: Props) {
	const getUserImage = () => {
		if (user.avatar) return getImage(user.avatar)
		else return ItemPlaceholder.src
	}

	return (
		<>
			<div className='border-t-2 border-grey-light mx-2' />

			<div
				className={`p-2 cursor-pointer transition-all duration-200 ${isActive ? 'bg-[#33384F1A]' : 'hover:bg-grey-light'}`}
				onClick={setActiveUser}
			>
				<div className='flex items-center gap-3'>
					<img src={getUserImage()} className='rounded-[50%] w-[40px] h-[40px]' />

					<p className='font-bold text-blue-dark text-lg'>
						{user.firstName} {user.lastName}
					</p>
				</div>
			</div>
		</>
	)
}

export default UserCard
