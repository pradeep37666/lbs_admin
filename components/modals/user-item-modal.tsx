import React from 'react'
import { Item } from '../../types/items'
import ModalWrapper from '../core/modal-wrapper'
import ItemOverview from '../item-overview'

type Props = {
	isOpen: boolean
	onClose: () => void
	item: Item | undefined
}

function UserItemModal({ isOpen, onClose, item }: Props) {
	const renderItemDetails = () => {
		if (!item) return <div />

		return <ItemOverview item={item} isModal resetItem={onClose} />
	}

	return (
		<ModalWrapper isOpen={isOpen} onClose={onClose}>
			<div onClick={(e) => e.stopPropagation()} className='rounded-lg w-1/2 max-h-[80%]'>
				{renderItemDetails()}
			</div>
		</ModalWrapper>
	)
}

export default UserItemModal
