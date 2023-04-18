import React from 'react'
import ItemPlaceholder from '../../assets/images/item-placeholder.png'
import getImage from '../../utils/getImage'
import { SupportTicket } from '../../types/types'
import { useQuery } from 'react-query'
import errorPopupParser from '../../utils/error-popup-parser'
import UserService from '../../services/users'
import { useAtom } from 'jotai'
import { snackAtom } from '../../stores/atoms'

type Props = {
	supportTicket: SupportTicket
	isActive: boolean
	setIsActive: () => void
}

function SupportTicketCard({ supportTicket, isActive, setIsActive }: Props) {
	const [, setSnack] = useAtom(snackAtom)
	const getUserImage = () => {
		if (user?.avatar) return getImage(user.avatar)
		else return ItemPlaceholder.src
	}

	const { data: user } = useQuery(['singleTicketUser', supportTicket.userId], () => UserService.getOne(supportTicket.userId), {
		onError: (err) => errorPopupParser(err, setSnack),
	})

	return (
		<>
			<div className='border-t-2 border-grey-light mx-2' />

			<div
				className={`p-2 cursor-pointer transition-all duration-200 ${isActive ? 'bg-[#33384F1A]' : 'hover:bg-grey-light'}`}
				onClick={() => setIsActive()}
			>
				<div className='px-2 py-2'>
					<div className='flex flex-col gap-1'>
						<p className='font-bold text-[16px] '>{supportTicket.subject}</p>
						<p className='text-[14px] h-6 truncate'>{supportTicket.message}</p>
						<div className='flex gap-2 items-center'>
							<img src={getUserImage()} className='rounded-[50%] w-[16px] h-[16px]' />
							<p className='text-[14px] font-bold'>
								{user?.firstName} {user?.lastName}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SupportTicketCard
