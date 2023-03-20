import React, { useEffect, useState } from 'react'

export interface ModalProps {
	children?: JSX.Element
	isOpen: boolean
	onClose: () => void
}

function ModalWrapper({ isOpen, onClose, children }: ModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
			window.scrollTo(0, 0)
		} else document.body.style.overflow = 'unset'
	}, [isOpen])

	useEffect(() => {
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])

	return (
		<div
			className={`${
				isOpen ? 'ease-in duration-200 opacity-100' : 'ease-out duration-300 opacity-0 pointer-events-none'
			} fixed inset-0 bg-[#10182033] transition-opacity h-screen w-full z-10 top-0 ease-in-out duration-500`}
			onClick={onClose}
		>
			<div
				className={`${
					isOpen ? 'translate-y-0' : 'translate-y-full'
				} h-full transform transition ease-in-out duration-500 w-full flex flex-col justify-center items-center`}
				onClick={onClose}
			>
				{children}
			</div>
		</div>
	)
}

export default ModalWrapper
