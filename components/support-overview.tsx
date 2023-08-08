import React, { useState } from 'react'
import Button from './core/button'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import UserService from '../services/users'
import errorPopupParser from '../utils/error-popup-parser'
import { useAtom } from 'jotai'
import { snackAtom } from '../stores/atoms'
import UserProfileCard from './cards/user-profile-card'
import LongTextInput from './core/long-text-input'
import ArrowUp from '../assets/icons/arrow-up'
import SupportTicketService from '../services/support-tickets'
import DismissTicketModal from './modals/dismiss-ticket-modal'

type Props = {
	supportTicketId: string
	isModal?: boolean
	resetTicket: () => void
}
function SupportOverview({ supportTicketId, isModal, resetTicket }: Props) {
	const [, setSnack] = useAtom(snackAtom)
	const queryClient = useQueryClient()

	const [isDismissModalOpen, setIsDismissModalOpen] = useState(false)
	const [message, setMessage] = useState('')

	const { data: supportTicket, isLoading: isTicketLoading } = useQuery(
		['singleTicket', supportTicketId],
		() => SupportTicketService.getOne(supportTicketId),
		{
			onError: (err) => errorPopupParser(err, setSnack),
		}
	)

	const { data: user, isLoading: isTicketUserLoading } = useQuery(
		['singleTicketUser', supportTicket?.userId],
		() => UserService.getOne(supportTicket?.userId ?? ''),
		{
			onError: (err) => errorPopupParser(err, setSnack),
			enabled: !!supportTicket,
		}
	)

	const { mutate: sendReply, isLoading: isReplyLoading } = useMutation(SupportTicketService.respondToTicket, {
		onError: (err) => errorPopupParser(err, setSnack),
		onSuccess: () => {
			setSnack({
				isOpen: true,
				severity: 'success',
				message: 'Reply sent',
			})
			queryClient.invalidateQueries(['singleTicket'])
		},
	})

	if (isTicketLoading || isTicketUserLoading || !supportTicket || !user) return <div />

	const sendMessage = () => {
		sendReply({
			supportId: supportTicket.id,
			reply: message,
		})
	}

	const renderInputOrReply = () => {
		if (supportTicket.reply)
			return (
				<div className='mb-6'>
					<h1 className='font-bold text-lg'>LBS Reply</h1>
					<p>{supportTicket.reply}</p>
				</div>
			)
		else
			return (
				<div className='px-4 mb-2'>
					<LongTextInput
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						rows={4}
						className='mb-0'
						placeholder='Enter message to user...'
					/>
					<div className='flex justify-between items-center'>
						<Button text='' icon={<ArrowUp />} className='btn-blue px-1 ml-auto' onClick={() => sendMessage()} isLoading={isReplyLoading} />
					</div>
				</div>
			)
	}

	return (
		<div
			className={`${
				isModal ? 'w-full' : 'max-w-[64%]'
			} bg-white border-[1px] border-grey-border rounded-xl flex-grow h-full overflow-auto hide-scroll p-4 flex flex-col`}
		>
			<DismissTicketModal
				isOpen={isDismissModalOpen}
				onClose={() => setIsDismissModalOpen(false)}
				ticketId={supportTicketId}
				onDismiss={resetTicket}
			/>
			<div className='flex justify-between items-center'>
				<p className='text-[20px] text-blue-dark'>Ticket Overview</p>
				<div className='flex gap-2 w-fit'>
					<Button text='Dismiss' onClick={() => setIsDismissModalOpen(true)} className='btn-white' />
				</div>
			</div>

			<div className='border-b-[1px] border-grey-border mt-4 mb-6 mx-4' />

			{!isModal && <UserProfileCard isViewProfileButtonShown user={user} />}

			<p className='font-bold text-xl mb-2'>{supportTicket.subject}</p>

			<p>{supportTicket.message}</p>

			<div className='mt-auto'>
				<div className='border-b-[1px] border-grey-border my-6 mx-4' />
				{renderInputOrReply()}
			</div>
		</div>
	)
}

export default SupportOverview
