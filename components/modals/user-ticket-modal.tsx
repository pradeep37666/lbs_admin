import React from 'react'
import ModalWrapper from '../core/modal-wrapper'
import { SupportTicket } from '../../types/types'
import SupportOverview from '../support-overview'

type Props = {
	isOpen: boolean
	onClose: () => void
	ticket: SupportTicket | undefined
}

function UserTicketModal({ isOpen, onClose, ticket }: Props) {
	const renderTicketDetails = () => {
		if (!ticket) return <div />

		return <SupportOverview supportTicketId={ticket.id} isModal resetTicket={onClose} />
	}

	return (
		<ModalWrapper isOpen={isOpen} onClose={onClose}>
			<div onClick={(e) => e.stopPropagation()} className='rounded-lg w-1/2 max-h-[80%]'>
				{renderTicketDetails()}
			</div>
		</ModalWrapper>
	)
}

export default UserTicketModal
