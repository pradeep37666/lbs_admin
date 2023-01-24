import { Snack } from '../types/types'

const errorPopupParser = (error: any, setSnack: (snack: Snack) => void) => {
	let message
	if (error instanceof Error) message = error.message
	else message = String(error)

	setSnack({
		isOpen: true,
		severity: 'error',
		message: message,
	})
}

export default errorPopupParser
