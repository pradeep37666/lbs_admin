import React, { ChangeEvent } from 'react'

type Props = {
	placeholder?: string
	className?: string
	value: string
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
	rows?: number
}

function LongTextInput({ placeholder, className, value, onChange, rows }: Props) {
	return (
		<div className='relative w-full'>
			<textarea
				className={`input-primary bg-grey-light border-none ` + className}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e)}
				rows={rows ?? 3}
				draggable={false}
			/>
		</div>
	)
}

export default LongTextInput
