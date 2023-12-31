import React, { useState } from 'react'
import Automotive from '../assets/icons/automotive'
import Delivery from '../assets/icons/delivery'
import Location from '../assets/icons/location'
import Star from '../assets/icons/star'
import { Item } from '../types/items'
import getImage from '../utils/getImage'
import Button from './core/button'
import ItemPlaceholder from '../assets/images/item-placeholder.png'
import { useQuery } from 'react-query'
import UserService from '../services/users'
import errorPopupParser from '../utils/error-popup-parser'
import { useAtom } from 'jotai'
import { snackAtom } from '../stores/atoms'
import ContactUserModal from './modals/contact-user-modal'
import ItemsService from '../services/items'
import { useRouter } from 'next/router'
import RemoveItemModal from './modals/remove-item-modal'
import UserProfileCard from './cards/user-profile-card'
import ReviewList from './review-list'
import Image from "next/image";

type Props = {
	item: Item
	isModal?: boolean
	resetItem: () => void
}

function ItemOverview({ item, isModal, resetItem }: Props) {
	const [, setSnack] = useAtom(snackAtom)
	const [isRemoveItemModalOpen, setIsRemoveItemModalOpen] = useState(false)
	const [isContactUserModalOpen, setIsContactUserModalOpen] = useState(false)

	const router = useRouter()

	const { data: user } = useQuery(['singleUser', item], () => UserService.getOne(item.userId), {
		onError: (err) => errorPopupParser(err, setSnack),
	})

	const { data: reviews } = useQuery(['itemReviews', item], () => ItemsService.getReviews(item.id), {
		onError: (err) => errorPopupParser(err, setSnack),
	})

	const getItemImage = (imageKey: string | undefined) => {
		if (imageKey) return getImage(imageKey)
		else return ItemPlaceholder.src
	}

	const renderItemImages = () => {
		return item?.images.map((image, index) => {
			return <Image key={index} src={getItemImage(image?.imageKey)} width={120} height={120} className='w-[120px] h-[120px] rounded-lg object-cover' alt='' />
		})
	}

	const renderModalButtons = () => {
		if (isModal) return <div />

		return (
			<>
				<Button text='Remove Item' onClick={() => setIsRemoveItemModalOpen(true)} className='btn-white' />
				<Button text='Contact User' onClick={() => setIsContactUserModalOpen(true)} className='btn-blue' />
			</>
		)
	}

	return (
		<div className='bg-white border-[1px] border-grey-border rounded-xl flex-grow h-full overflow-auto hide-scroll p-4'>
			<RemoveItemModal
				isOpen={isRemoveItemModalOpen}
				onClose={() => {
					setIsRemoveItemModalOpen(false)
				}}
				onRemove={resetItem}
				itemId={item.id}
			/>
			<ContactUserModal
				isOpen={isContactUserModalOpen}
				onClose={() => setIsContactUserModalOpen(false)}
				user={user}
				userImage={getItemImage(user?.avatar)}
			/>

			<div className='flex justify-between border-b-[1px] border-grey-border items-center pb-2 mb-4'>
				<p className='text-[20px] text-blue-dark'>Item Overview</p>
				<div className='flex gap-2 w-fit'>{renderModalButtons()}</div>
			</div>

			<p className='font-bold text-[24px] mb-2'>{item.title}</p>

			<div className='flex items-center gap-2 mb-2 text-[14px]'>
				<Location />
				<p>{item.address.fullAddress}</p>
			</div>

			<div className='flex items-center gap-3 text-[14px] mb-2'>
				<Delivery />
				{item.deliveryOption !== 'NONE' ? (
					<p>
						Delivery Available /{' '}
						<span className='text-[#000000CC]'>
							${item.deliveryPrice} Delivery Fee / ${item.pickupPrice} Pickup Fee
						</span>{' '}
					</p>
				) : (
					<p>Delivery Unavailable</p>
				)}
				<Automotive />
				<p>{item.category}</p>
			</div>

			<p className='text-[30px] font-bold text-blue-dark'>
				${item.price}
				<span className='text-[#58554E] text-[20px] font-normal ml-1'>Per Slot</span>
			</p>

			<div className='flex flex-wrap gap-2 border-b-[1px] border-grey-border pt-4 pb-8 mb-4'>{renderItemImages()}</div>

			<p className='font-bold text-[20px] mb-2'>Description</p>

			<p className='border-b-[1px] border-grey-border pb-8 mb-4'>{item.description}</p>

			<p className='font-bold text-[20px] mb-2'>Ratings</p>

			<UserProfileCard isViewProfileButtonShown={!isModal} user={user} />

			<div className='flex border rounded-xl border-grey-border p-4 justify-between items-center '>
				<div className='flex items-center gap-3 text-[20px]'>
					<p className='font-bold'>{item.title}</p>
					<p>{item.rating}/5</p>
					<Star />
				</div>
			</div>

			{/* {reviews.data && reviews.data.length !== 0 && (
				<>
					<div className='border-b-[1px] border-grey-border pb-8 mb-4' />
					<p className='font-bold text-[20px] mb-2'>Reviews</p> */}

			<p className='font-bold text-[20px] mb-2'>Reviews</p>

			{reviews && <ReviewList reviews={reviews} />}
		</div>
	)
}

export default ItemOverview
