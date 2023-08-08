import React from 'react'
import { Item } from '../types/items'
import Delivery from '../assets/icons/delivery'

type Props = {
	item?: Item
	itemIsLoading: boolean
}

const DisputeItemCosts = ({ item, itemIsLoading }: Props) => {
	if (!item || itemIsLoading) return <div>Item not found</div>

	return (
		<div className='text-[14px]'>
			<h1 className='font-bold text-[20px] mb-2'>Costs</h1>
			<div className='flex items-center justify-between mb-4 text-[18px]'>
				<p>Cost for item</p>
				<p className='text-blue-dark font-bold'>${item.price}</p>
			</div>
			{item.deliveryPrice && (
				<div className='flex items-center gap-2 mb-2'>
					<Delivery />
					<p>Item Delivery</p>
					<p className='ml-auto text-blue-dark font-bold'>${item.deliveryPrice}</p>
				</div>
			)}
			{item.pickupPrice && (
				<div className='flex items-center gap-2'>
					<Delivery />
					<p>Item Pickup</p>
					<p className='ml-auto text-blue-dark font-bold'>${item.pickupPrice}</p>
				</div>
			)}
			<div className='border-b-[2px] border-grey-dark my-4 mx-4' />

			<div className='flex items-center justify-between text-[18px]'>
				<p>Total Price</p>
				<p className='text-blue-dark font-bold'>${item.price + item.deliveryPrice + item.pickupPrice}</p>
			</div>
		</div>
	)
}

export default DisputeItemCosts
