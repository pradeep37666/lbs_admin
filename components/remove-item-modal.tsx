import { useAtom } from 'jotai'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import ItemsService from '../services/items'
import { snackAtom } from '../stores/atoms'
import errorPopupParser from '../utils/error-popup-parser'
import Button from './core/button'
import ModalWrapper, { ModalProps } from './core/modal-wrapper'

interface Props extends ModalProps {
	itemId: string
}

function RemoveItemModal({ isOpen, setIsOpen, itemId }: Props) {
	const [, setSnack] = useAtom(snackAtom)
	const queryClient = useQueryClient()

	const removeItem = useMutation(ItemsService.removeItem, {
		onError: (err) => errorPopupParser(err, setSnack),
		onSuccess: () => {
			queryClient.invalidateQueries('items')
			setIsOpen(false)
		},
	})

	return (
		<ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
			<div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg w-1/4 border border-grey-base'>
				<div className='flex justify-between items-center p-4 border-b-2 mb-4 border-grey-base'>
					<p className='text-xl text-blue-dark'>Remove Item</p>
					<Button text='Close' onClick={() => setIsOpen(false)} className='btn-white mb-0' />
				</div>

				<div className='px-4 leading-5 mb-4'>
					<p className='mb-4'>Are you sure you want to remove this item?</p>
					<p>
						If you remove this item from Little big shed, this user will no longer be able to see it in their shed, and borrows that have been
						booked on the platform will be cancelled immediately.
					</p>
				</div>

				<div className='flex gap-4 px-4 py-2'>
					<Button text='Remove Item' onClick={() => removeItem.mutate(itemId)} className='btn-blue' />
					<Button text='Keep Item' onClick={() => setIsOpen(false)} className='btn-white' />
				</div>
			</div>
		</ModalWrapper>
	)
}

export default RemoveItemModal
