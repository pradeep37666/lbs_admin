import React from 'react'
import { BookingDuration } from '../types/types'
import moment from 'moment'

type Props = {
	bookingDuration?: BookingDuration
	bookingIsLoading: boolean
}

const DisputeItemDates = ({ bookingDuration, bookingIsLoading }: Props) => {
	if (!bookingDuration || bookingIsLoading) return <div>Booking not found</div>

	const formatDate = (date: string) => {
		return moment(date).format('hA dddd Do - MMMM')
	}

	return (
		<div className='text-[14px]'>
			<h1 className='font-bold text-[20px] mb-2'>Dates</h1>
			<div className='flex items-center justify-between mb-4 text-[18px] gap-4'>
				<p className='text-blue-dark font-bold'>Collect</p>
				<p className='text-[14px]'>{formatDate(bookingDuration.startDate)}</p>
			</div>
			<div className='flex items-center justify-between mb-4 text-[18px] gap-4'>
				<p className='text-blue-dark font-bold'>Return</p>
				<p className='text-[14px]'>{formatDate(bookingDuration.endDate)}</p>
			</div>
		</div>
	)
}

export default DisputeItemDates
