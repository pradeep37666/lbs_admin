import { useAtom } from 'jotai'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { snackAtom } from '../../stores/atoms'
import errorPopupParser from '../../utils/error-popup-parser'
import Button from '../core/button'
import ModalWrapper, { ModalProps } from '../core/modal-wrapper'
import SupportTicketService from '../../services/support-tickets'

interface Props extends ModalProps {
	ticketId: string
	onDismiss: () => void
}

function DismissTicketModal({ isOpen, onClose, ticketId, onDismiss }: Props) {
	const [, setSnack] = useAtom(snackAtom)
	const queryClient = useQueryClient()

	const { mutate: dismissTicket } = useMutation(SupportTicketService.dismissTicket, {
		onError: (err) => errorPopupParser(err, setSnack),
		onSuccess: () => {
			setSnack({
				message: 'Ticket Dismissed',
				isOpen: true,
				severity: 'success',
			})
			queryClient.invalidateQueries(['supportTickets'])
			onClose()
			onDismiss()
		},
	})

	return (
		<ModalWrapper isOpen={isOpen} onClose={onClose}>
			<div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg w-1/4 min-w-[400px] border border-grey-base'>
				<div className='flex justify-between items-center p-4 border-b-2 mb-4 border-grey-base'>
					<p className='text-xl text-blue-dark'>Dismiss Support Ticket</p>
					<Button text='Close' onClick={onClose} className='btn-white mb-0' />
				</div>

				<div className='px-4 leading-5 mb-4'>
					<p className='mb-4'>Are you sure you want to dismiss this ticket?</p>
					<p>Dismissing this ticket will remove it from support lists, removing the ability to respond in future.</p>
				</div>

				<div className='flex gap-4 px-4 py-2'>
					<Button text='Dismiss Ticket' onClick={() => dismissTicket(ticketId)} className='btn-blue' />
					<Button text='Keep Ticket' onClick={onClose} className='btn-white' />
				</div>
			</div>
		</ModalWrapper>
	)
}

export default DismissTicketModal
