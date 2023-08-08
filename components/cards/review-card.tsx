import React from 'react'
import { ItemReview } from '../../services/items'
import getImage from '../../utils/getImage'
import ItemPlaceholder from '../../assets/images/item-placeholder.png'
import Star from '../../assets/icons/star'

type Props = {
	review: ItemReview
}

const ReviewCard = ({ review }: Props) => {
	const getUserImage = () => {
		if (review.user?.avatar) return getImage(review.user.avatar)
		else return ItemPlaceholder.src
	}

	return (
		<div className='border rounded-xl border-grey-border p-4 justify-between items-center mb-4 w-[250px] min-w-[250px] max-w-[250px] overflow-hidden'>
			<div className='flex items-center text-[14px] gap-3 mb-2'>
				<img src={getUserImage()} className='w-[35px] h-[35px] rounded-[50%] object-cover' />
				<div>
					<p className='font-bold'>{review.user?.firstName + ' ' + review.user?.lastName}</p>
					<div className=' flex gap-2'>
						<p>{review.user.borrowerRating}/5</p>
						<Star />
					</div>
				</div>
			</div>
			<p className='text-[16px] h-52 overflow-auto pb-6 hide-scroll'>{review.comment}</p>
		</div>
	)
}

export default ReviewCard
