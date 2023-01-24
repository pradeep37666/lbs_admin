import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {}

function Close({ className, onClick }: Props) {
	return (
		<div
			className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className}
			onClick={onClick}>
			<svg xmlns='http://www.w3.org/2000/svg' width='17.973' height='17.973' viewBox='0 0 17.973 17.973' className='w-4 h-4'>
				<path
					id='close'
					d='M5.376,5.376a1.284,1.284,0,0,1,1.815,0l6.795,6.795,6.795-6.795A1.284,1.284,0,1,1,22.6,7.192l-6.8,6.795L22.6,20.781A1.284,1.284,0,1,1,20.781,22.6l-6.795-6.8L7.191,22.6a1.284,1.284,0,1,1-1.815-1.815l6.8-6.795L5.376,7.191a1.284,1.284,0,0,1,0-1.815Z'
					transform='translate(-5 -5)'
					fill='#FFF'
				/>
			</svg>
		</div>
	)
}

export default Close
