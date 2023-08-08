import Head from 'next/head'
import React, { ReactElement, useState } from 'react'
import PageWrapper from '../../components/core/page-wrapper'
import SupportList from '../../components/support-list'
import SupportOverview from '../../components/support-overview'
import { SupportTicket } from '../../types/types'

function Support() {
	const [activeSupportTicketId, setActiveSupportTicketId] = useState<string>()
	return (
		<div className='w-full h-full select-none overflow-hidden'>
			<p className='text-blue-dark h-[45px] text-[30px] font-bold mb-4'>Support</p>

			<div className='w-full h-[calc(100%_-_65px)] flex gap-4'>
				<SupportList setActiveSupportTicketId={setActiveSupportTicketId} activeSupportTicketId={activeSupportTicketId} />
				{activeSupportTicketId && (
					<SupportOverview supportTicketId={activeSupportTicketId} resetTicket={() => setActiveSupportTicketId(undefined)} />
				)}
			</div>
		</div>
	)
}

Support.getLayout = function getLayout(page: ReactElement) {
	return (
		<PageWrapper>
			<Head>
				<title>Support</title>
			</Head>

			{page}
		</PageWrapper>
	)
}

export default Support
