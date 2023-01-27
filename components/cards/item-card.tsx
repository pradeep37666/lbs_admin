import React from 'react'
import { Item } from '../../types/items'
import moment from 'moment'
import ItemPlaceholder from '../../assets/images/item-placeholder.png'
import getImage from '../../utils/getImage'

type Props = {
	item: Item
	isActive: boolean
	setActiveItem: (activeItem: Item) => void
}

function ItemCard({ item, isActive, setActiveItem }: Props) {
	const getItemImage = () => {
		if (item.images[0]?.imageKey) return getImage(item.images[0]?.imageKey)
		else return ItemPlaceholder.src
	}

	return (
		<>
			<div className='border-t-2 border-grey-light mx-2' />

			<div
				className={`p-2 cursor-pointer transition-all duration-200 ${isActive ? 'bg-[#33384F1A]' : 'hover:bg-grey-light'}`}
				onClick={() => setActiveItem(item)}
			>
				<div className='flex items-center gap-3'>
					<img src={getItemImage()} className='rounded-sm w-[60px] h-[60px]' />

					<div>
						<p className='font-bold text-[16px] '>{item.title}</p>
						<div className='flex gap-1'>
							<p className='font-bold text-[14px] text-blue-dark'>${item.price} per slot</p>
							<p className='text-[14px] text-grey-text'>Posted {moment(item.createdAt).format('DD/MM/YYYY')}</p>
						</div>
						<div className='flex gap-1'>
							<img className='border border-black rounded-[50%] h-[16px] w-[16px]' />
							<p className='text-[14px]'>{item.rating}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ItemCard
