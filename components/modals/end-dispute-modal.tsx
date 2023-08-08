import { useAtom } from 'jotai'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { snackAtom } from '../../stores/atoms'
import errorPopupParser from '../../utils/error-popup-parser'
import Button from '../core/button'
import ModalWrapper, { ModalProps } from '../core/modal-wrapper'
import DisputeService from '../../services/disputes'

interface Props extends ModalProps {
	bookingId: string
	onDismiss: () => void
}

function EndDisputeModal({ isOpen, onClose, bookingId, onDismiss }: Props) {
	const [, setSnack] = useAtom(snackAtom)
	const queryClient = useQueryClient()

	const { mutate: endDispute } = useMutation(DisputeService.endDispute, {
		onError: (err) => errorPopupParser(err, setSnack),
		onSuccess: () => {
			setSnack({
				message: 'Dispute Dismissed',
				isOpen: true,
				severity: 'success',
			})
			queryClient.invalidateQueries(['disputes'])
			onClose()
			onDismiss()
		},
	})

	return (
		<ModalWrapper isOpen={isOpen} onClose={onClose}>
			<div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg w-1/4 min-w-[400px] border border-grey-base'>
				<div className='flex justify-between items-center p-4 border-b-2 mb-4 border-grey-base'>
					<p className='text-xl text-blue-dark'>End Dispute</p>
					<Button text='Close' onClick={onClose} className='btn-white mb-0' />
				</div>

				<div className='px-4 leading-5 mb-4'>
					<p className='mb-4'>Are you sure you want to end this dispute?</p>
					<p>
						Ending this dispute will remove it from the active disputes list. This should only be done once the dispute has been settled between
						the borrower and lender.
					</p>
				</div>

				<div className='flex gap-4 px-4 py-2'>
					<Button text='End Dispute' onClick={() => endDispute(bookingId)} className='btn-blue' />
					<Button text='Keep Dispute' onClick={onClose} className='btn-white' />
				</div>
			</div>
		</ModalWrapper>
	)
}

export default EndDisputeModal
