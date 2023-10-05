import parser from "html-react-parser";
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Blog } from '../services/blog';
import { snackAtom } from '../stores/atoms';
import getImage from '../utils/getImage';


type Props = {
	values: Blog
	isModal?: boolean
	resetTicket: () => void
}
function BlogOverview({ isModal, resetTicket, values }: Props) {
	
	console.log("---values---", values);

	return (
		<div
			className={`${isModal ? 'w-full' : 'max-w-[64%]'
				} bg-white border-[1px] border-grey-border rounded-xl flex-grow h-full overflow-auto hide-scroll p-4 flex flex-col`}
		>
			<div className='blog-content-div'>
				

				{parser(values.contentBody)}
			</div>

		</div>
	)
}

export default BlogOverview
