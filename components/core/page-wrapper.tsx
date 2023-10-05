import React from 'react'
import SideBar from './sidebar'

type Props = {
	children: JSX.Element[]
}

function PageWrapper({ children }: Props) {
	return (
		<div className='w-screen h-screen bg-grey-light flex overflow-x-hidden'>
			<SideBar />

			<div className='w-[calc(100%_-_240px)] bg-grey-light py-6 px-12 flex flex-col overflow-y-auto'>
				<p className='text-[16px] text-blue-dark pl-8 mb-2'>
					Welcome back, <span className='font-bold '>Sarmuhabat</span> 👋
				</p>
				{children}
			</div>
		</div>
	)
}

export default PageWrapper
