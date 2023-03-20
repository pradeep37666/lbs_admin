import React, { useState } from 'react'
import { Item } from '../types/items'
import ItemCard from './cards/item-card'
import UserItemModal from './modals/user-item-modal'

type Props = {
	items: Item[]
}

function UserItems({ items }: Props) {
	const [activeItem, setActiveItem] = useState<Item>()

	const renderItems = () => {
		return items.map((item, index) => {
			return <ItemCard item={item} isActive={activeItem === item} key={index} setActiveItem={setActiveItem} />
		})
	}

	return (
		<div>
			<UserItemModal isOpen={activeItem !== undefined} item={activeItem} onClose={() => setActiveItem(undefined)} />

			{renderItems()}
		</div>
	)
}

export default UserItems
