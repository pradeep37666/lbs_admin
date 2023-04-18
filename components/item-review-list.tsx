import React from 'react'
import { Review } from '../types/types'
import ItemReviewCard from './cards/item-review-card'

type Props = {
	reviews: Review[]
}

function ItemReviewList({ reviews }: Props) {
	const renderReviews = () => {
		return reviews.map((review, index) => {
			return <ItemReviewCard key={index} review={review} />
		})
	}

	return <div className='flex gap-4 flex-wrap'>{renderReviews()}</div>
}

export default ItemReviewList
