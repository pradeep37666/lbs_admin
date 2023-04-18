import React, { useState } from 'react'
import Button from './core/button'
import { useQuery } from 'react-query'
import UserService from '../services/users'
import errorPopupParser from '../utils/error-popup-parser'
import { useAtom } from 'jotai'
import { snackAtom } from '../stores/atoms'
import { SupportTicket } from '../types/types'
import UserProfileCard from './cards/user-profile-card'
import LongTextInput from './core/long-text-input'
import ArrowUp from '../assets/icons/arrow-up'

type Props = {
	supportTicket: SupportTicket
}
function SupportOverview({ supportTicket }: Props) {
	const [, setSnack] = useAtom(snackAtom)

	const [isDismissModalOpen, setIsDismissModalOpen] = useState(false)
	const [message, setMessage] = useState('')

	const { data: user } = useQuery(['singleTicketUser', supportTicket.userId], () => UserService.getOne(supportTicket.userId), {
		onError: (err) => errorPopupParser(err, setSnack),
	})

	const sendMessage = () => {}

	return (
		<div className='bg-white border-[1px] border-grey-border rounded-xl flex-grow h-full overflow-auto hide-scroll p-4 max-w-[64%] flex flex-col'>
			<div className='flex justify-between items-center'>
				<p className='text-[20px] text-blue-dark'>Ticket Overview</p>
				<div className='flex gap-2 w-fit'>
					<Button text='Dismiss' onClick={() => setIsDismissModalOpen(true)} className='btn-white' />
				</div>
			</div>

			<div className='border-b-[1px] border-grey-border mt-4 mb-6 mx-4' />

			<UserProfileCard isViewProfileButtonShown user={user} />

			<p className='font-bold text-xl mb-2'>{supportTicket.subject}</p>

			<p>{supportTicket.message}</p>

			<div className='mt-auto'>
				<div className='border-b-[1px] border-grey-border my-6 mx-4' />
				<div className='px-4 mb-2'>
					<LongTextInput
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						rows={4}
						className='mb-0'
						placeholder='Enter message to user...'
					/>
					<div className='flex justify-between items-center'>
						<Button text='' icon={<ArrowUp />} className='btn-blue px-1 ml-auto' onClick={() => sendMessage()} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default SupportOverview
