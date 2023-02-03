import React from 'react'
import LogoRed from '../../assets/logos/logo-red'

function Loading() {
	return (
		<div className='w-screen h-screen flex justify-center items-center bg-grey-light'>
			<LogoRed className='mx-auto w-min mb-6 animate-bounce' />
		</div>
	)
}

export default Loading
