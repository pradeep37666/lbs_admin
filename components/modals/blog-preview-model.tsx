import React from 'react'
import ModalWrapper from '../core/modal-wrapper'
import { SupportTicket } from '../../types/types'
import BlogOverview from '../blog-overview'
import { Blog } from '../../services/blog'


type Props = {
	isOpen: boolean
	onClose: () => void
	values:Blog
}

function BlogPreviewModel({ isOpen, onClose, values }: Props) {
	const renderTicketDetails = () => {
		if (!values) return <div />
		return <BlogOverview values={values} isModal resetTicket={onClose} />
	}
	return (
		<ModalWrapper isOpen={isOpen} onClose={onClose}>
			<div onClick={(e) => e.stopPropagation()} className='rounded-lg w-1/2 max-h-[80%]'>
				{renderTicketDetails()}
			</div>
		</ModalWrapper>
	)
}

export default BlogPreviewModel