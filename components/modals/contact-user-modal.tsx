import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import ArrowUp from '../../assets/icons/arrow-up'
import Star from '../../assets/icons/star'
import UserService from '../../services/users'
import { snackAtom } from '../../stores/atoms'
import { User } from '../../types/types'
import errorPopupParser from '../../utils/error-popup-parser'
import Button from '../core/button'
import LongTextInput from '../core/long-text-input'
import ModalWrapper, { ModalProps } from '../core/modal-wrapper'
import Image from "next/image";


interface Props extends ModalProps {
	user: User | undefined
	userImage: string
}

function ContactUserModal({ isOpen, onClose, user, userImage }: Props) {
	const [, setSnack] = useAtom(snackAtom)
	const [message, setMessage] = useState('')

	const contactUser = useMutation(UserService.contactUser, {
		onError: (err) => errorPopupParser(err, setSnack),
		onSuccess: (res) => {
			setSnack({
				isOpen: true,
				message: 'Message Sent!',
				severity: 'success',
			})
			onClose()
		},
	})

	const sendMessage = () => {
		if (!message || !user) return

		contactUser.mutate({
			userId: user.id,
			message: message,
			subject: 'LBS Support Query',
		})
	}

	return (
		<ModalWrapper isOpen={isOpen} onClose={onClose}>
			<div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg w-1/4 min-w-[400px] border border-grey-base'>
				<div className='flex justify-between items-center p-4 border-b-2 mb-4 border-grey-base'>
					<p className='text-xl text-blue-dark'>Contact User</p>
					<Button text='Close' onClick={() => onClose()} className='btn-white mb-0' />
				</div>

				<div className='flex border rounded-xl border-grey-border p-4 justify-between items-center mb-4 mx-4'>
					<div className='flex items-center gap-3 text-[20px]'>
						<Image src={userImage} width={45} height={45} className='w-[45px] h-[45px] rounded-[50%] object-cover' alt='' />
						<p className='font-bold'>{user?.firstName + ' ' + user?.lastName}</p>
						<p>{user?.borrowerRating}/5</p>

						<Star />
					</div>
				</div>

				<div className='px-4 mb-2'>
					<LongTextInput
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						rows={4}
						className='mb-0'
						placeholder='Enter message to user...'
					/>
					<div className='flex justify-between items-center'>
						<p className='text-xs text-grey-base'>This will send an email to the user&apos;s registered email address.</p>
						<Button text='' icon={<ArrowUp />} className='btn-blue px-1 ml-auto' onClick={() => sendMessage()} />
					</div>
				</div>
			</div>
		</ModalWrapper>
	)
}

export default ContactUserModal
