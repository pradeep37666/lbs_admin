type PaginatedDataSet<T> = {
	data: T[]
	count: number
	nextPage: number
}

type PaginatedDataReturn<T> = {
	data: T[]
	total: number
}

const getItemsFromPagination = <T>(paginatedData: PaginatedDataSet<T>[] | undefined): PaginatedDataReturn<T> => {
	if (!paginatedData)
		return {
			data: [],
			total: 0,
		}

	const fullDataList: T[] = []
	let count = 0
	paginatedData.forEach((page) => {
		count = page.count
		page.data.forEach((item) => {
			fullDataList.push(item)
		})
	})

	return {
		data: fullDataList,
		total: count,
	}
}

export default getItemsFromPagination
