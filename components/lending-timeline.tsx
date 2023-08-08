import React from 'react'
import { BookingEvent } from '../types/types'
import moment from 'moment'

type Props = {
	events: BookingEvent[]
}

const LendingTimeline = ({ events }: Props) => {
	const formatEventDate = (date: string) => {
		return moment(date).format('hA dddd Do MMM')
	}

	const formatEventName = (event: string) => {
		return event.toLowerCase().replaceAll('_', ' ')
	}

	function compareDates(a: BookingEvent, b: BookingEvent) {
		return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
	}

	const renderEvents = () => {
		const sortedEvents = events.sort(compareDates)

		return sortedEvents.map((event, index) => {
			return (
				<div key={index} className='text-[14px]'>
					<p className='capitalize font-bold text-[16px]'>{formatEventName(event.event)}</p>
					<p>{formatEventDate(event.createdAt)}</p>
				</div>
			)
		})
	}

	return (
		<div>
			<h1 className='font-bold text-[20px] mb-4'>Lending Events</h1>
			<div className='flex gap-6 items-center mb-4 flex-wrap'>{renderEvents()}</div>
		</div>
	)
}

export default LendingTimeline
