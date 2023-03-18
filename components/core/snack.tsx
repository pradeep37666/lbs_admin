import { useEffect } from 'react'
import Close from '../../assets/icons/close'
import { Snack } from '../../types/types'

interface Props {
	snack: Snack
	setIsOpen: (isOpen: boolean) => void
	timeoutMS: number
}

function Snackbar({ snack, setIsOpen, timeoutMS }: Props) {
	const { isOpen, message, severity } = snack

	useEffect(() => {
		setTimeout(() => {
			setIsOpen(false)
		}, timeoutMS)
	}, [isOpen])

	return (
		<div
			className={`w-fit absolute bottom-4 left-4 cursor-pointer select-none ${
				isOpen && message ? 'opacity-100' : 'pointer-events-none opacity-0 '
			} transition-all duration-500`}
			onClick={() => setIsOpen(false)}
		>
			<div
				className={`w-full border-grey-base rounded-lg text-[18px] shadow-none hover:shadow-lg transition-all duration-300 text-white flex gap-4 items-center p-3 ${
					severity === 'success' ? 'bg-success-base' : 'bg-error-base'
				}`}
			>
				{message}
				<Close onClick={() => setIsOpen(false)} />
			</div>
		</div>
	)
}

export default Snackbar
