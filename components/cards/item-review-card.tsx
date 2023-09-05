import React from 'react'
import Star from '../../assets/icons/star'
import { Review } from '../../types/types'
import getImage from '../../utils/getImage'
import ItemPlaceholder from '../../assets/images/item-placeholder.png'
import Image from "next/image";

type Props = {
	review: Review
}

function ItemReviewCard({ review }: Props) {
	const getUserImage = () => {
		if (review.user?.avatar) return getImage(review.user.avatar)
		else return ItemPlaceholder.src
	}

	return (
		<div className='w-[250px] min-w-[250px] border-grey-base border p-2 rounded-md h-[200px] overflow-y-scroll hide-scroll'>
			<div className='flex gap-4'>
				<Image src={getUserImage()}  width={45} height={45} className='w-[45px] h-[45px] rounded-[50%] object-cover' alt='' />
				<div className='text-sm'>
					<p className='font-bold '>
						{review.user.firstName} {review.user.lastName}
					</p>
					<p>{review.user.borrowerRating}/5</p>
				</div>
			</div>

			<p className=''>{review.comment}</p>
		</div>
	)
}

export default ItemReviewCard
