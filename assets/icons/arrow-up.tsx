import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {}

function ArrowUp({ className, onClick, color }: Props) {
	return (
		<div
			className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className}
			onClick={onClick}
		>
			<svg id='arrow-up' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
				<path
					id='Line_45'
					data-name='Line 45'
					d='M0,15a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V14A1,1,0,0,1,0,15Z'
					transform='translate(8 1)'
					fill='#fff'
				/>
				<path
					id='Path_1116'
					data-name='Path 1116'
					d='M19,13a1,1,0,0,1-.707-.293L12,6.414,5.707,12.707a1,1,0,0,1-1.414-1.414l7-7a1,1,0,0,1,1.414,0l7,7A1,1,0,0,1,19,13Z'
					transform='translate(-4 -4)'
					fill='#fff'
				/>
			</svg>
		</div>
	)
}

export default ArrowUp
