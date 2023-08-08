import Head from 'next/head'
import React, { ReactElement, useState } from 'react'
import PageWrapper from '../../components/core/page-wrapper'
import DisputeList from '../../components/dispute-list'
import { Booking } from '../../types/types'
import DisputeOverview from '../../components/dispute-overview'

function Disputes() {
	const [activeDisputeId, setActiveDisputeId] = useState<string>()
	return (
		<div className='w-full h-full select-none overflow-hidden'>
			<p className='text-blue-dark h-[45px] text-[30px] font-bold mb-4'>Disputes</p>

			<div className='w-full h-[calc(100%_-_65px)] flex gap-4'>
				<DisputeList setActiveDisputeId={setActiveDisputeId} activeDisputeId={activeDisputeId} />
				{activeDisputeId && <DisputeOverview disputeId={activeDisputeId} />}
			</div>
		</div>
	)
}

Disputes.getLayout = function getLayout(page: ReactElement) {
	return (
		<PageWrapper>
			<Head>
				<title>Disputes</title>
			</Head>

			{page}
		</PageWrapper>
	)
}

export default Disputes
