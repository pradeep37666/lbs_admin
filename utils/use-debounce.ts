import { useEffect, useState } from 'react'

function useDebounce(value: any, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)
		return () => {
			clearTimeout(debounceTimeout)
		}
	}, [value, delay])

	return debouncedValue
}

export default useDebounce
