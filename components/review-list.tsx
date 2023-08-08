import React from 'react'
import { ItemReview } from '../services/items'
import ReviewCard from './cards/review-card'

type Props = {
	reviews: ItemReview[]
}

function ReviewList({ reviews }: Props) {
	const renderReviews = () => {
		if (reviews.length < 1) return <div className='pb-12'>This item has no reviews.</div>

		return reviews.map((review, index) => {
			return <ReviewCard review={review} key={index} />
		})
	}

	return <div className='flex gap-4 w-[full] overflow-auto'>{renderReviews()}</div>
}

export default ReviewList
