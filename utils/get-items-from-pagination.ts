import { ItemSearchReturn } from '../services/items'
import { Item } from '../types/items'

const getAllItems = (itemSearchResults: ItemSearchReturn[] | undefined): { items: Item[]; numItems: number } => {
	if (!itemSearchResults)
		return {
			items: [],
			numItems: 0,
		}

	const fullItemList: Item[] = []
	let count = 0
	itemSearchResults.forEach((page) => {
		count = page.count
		page.data.forEach((item) => {
			fullItemList.push(item)
		})
	})

	return {
		items: fullItemList,
		numItems: count,
	}
}

export default getAllItems
