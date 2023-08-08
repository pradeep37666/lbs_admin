import React, { useState } from 'react'
import { Booking, SupportTicket } from '../types/types'
import SupportTicketCard from './cards/support-ticket-card'
import UserTicketModal from './modals/user-ticket-modal'
import DisputeCard from './cards/dispute-card'

type Props = {
	disputes: Booking[]
}

function UserDisputes({ disputes }: Props) {
	const [activeDispute, setActiveDispute] = useState<Booking>()

	const renderTickets = () => {
		return disputes.map((booking, index) => {
			return <DisputeCard booking={booking} isActive={false} setActive={() => setActiveDispute(booking)} key={index} />
		})
	}

	return (
		<div>
			{/* <UserDisputeModal isOpen={activeDispute !== undefined} ticket={activeDispute} onClose={() => setActiveDispute(undefined)} /> */}

			{renderTickets()}
		</div>
	)
}

export default UserDisputes
