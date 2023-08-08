import React, { useState } from 'react'
import { Item } from '../types/items'
import ItemCard from './cards/item-card'
import UserItemModal from './modals/user-item-modal'
import { SupportTicket } from '../types/types'
import SupportTicketCard from './cards/support-ticket-card'
import UserTicketModal from './modals/user-ticket-modal'

type Props = {
	tickets: SupportTicket[]
}

function UserSupportTickets({ tickets }: Props) {
	const [activeTicket, setActiveTicket] = useState<SupportTicket>()

	const renderTickets = () => {
		return tickets.map((ticket, index) => {
			return <SupportTicketCard supportTicket={ticket} isActive={false} setIsActive={() => setActiveTicket(ticket)} key={index} />
		})
	}

	return (
		<div>
			<UserTicketModal isOpen={activeTicket !== undefined} ticket={activeTicket} onClose={() => setActiveTicket(undefined)} />

			{renderTickets()}
		</div>
	)
}

export default UserSupportTickets
