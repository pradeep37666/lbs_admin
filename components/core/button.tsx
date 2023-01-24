import { ReactNode } from 'react'
import Spinner from '../../assets/icons/spinner'

type Props = {
	text: string
	onClick: () => void
	className?: string
	icon?: ReactNode
	isLoading?: boolean
	type?: 'submit' | 'button'
}

function Button({ text, onClick, className, icon, isLoading, type }: Props): JSX.Element {
	return (
		<button onClick={!isLoading ? onClick : () => null} className={`btn-primary ` + className} type={type ?? 'button'}>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					{text}
					{icon && <i>{icon}</i>}
				</>
			)}
		</button>
	)
}

export default Button
