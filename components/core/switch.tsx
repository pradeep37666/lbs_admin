import React from 'react'

type Props = {
	value: boolean
	onChange: () => void
	isLoading?: boolean
}

function Switch({ value, onChange, isLoading }: Props) {
	return (
		<label className='relative inline-flex items-center cursor-pointer'>
			<input type='checkbox' checked={value} onChange={onChange} className='sr-only peer' disabled={isLoading} />
			<div
				className={`${value ? 'bg-success-base ' : 'bg-red-base '} ${
					isLoading && ' opacity-40'
				} w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
			></div>
		</label>
	)
}

export default Switch
