import { KeyboardEvent, useState } from 'react'
import SearchIcon from '../../assets/icons/search'

type Props = {
	placeholder?: string
	className?: string
	value: string
	onChange: (text: string) => void
	type?: 'NUMBER' | 'TEXT'
	onKeyUp?: (e: KeyboardEvent) => void
	autoFocus?: boolean
}

function SearchInput({ placeholder, className, value, onChange, type, onKeyUp, autoFocus }: Props): JSX.Element {
	const [isFocused, setIsFocused] = useState(false)

	const validateIsNumber = (text: string) => {
		if (isNaN(Number(text))) return
		onChange(text)
	}

	return (
		<div className='relative'>
			<SearchIcon className='absolute top-3 left-2' />
			<div
				className={`absolute top-2 left-10 text-grey-placeholder select-none cursor-text pointer-events-none ${
					isFocused || value ? 'top-[-5px] left-7 scale-[0.6]' : ''
				} transition-all duration-300`}
			>
				{placeholder}
			</div>
			<input
				className={`search-primary ` + className}
				type='text'
				value={value}
				onChange={(e) => (type === 'NUMBER' ? validateIsNumber(e.target.value) : onChange(e.target.value))}
				onKeyUp={onKeyUp}
				autoFocus={autoFocus}
				onBlur={() => setIsFocused(false)}
				onFocus={() => setIsFocused(true)}
			></input>
		</div>
	)
}

export default SearchInput
