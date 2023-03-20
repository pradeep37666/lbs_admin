import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import PageWrapper from '../../components/core/page-wrapper'
import UserList from '../../components/user-list'
import UserOverview from '../../components/user-overview'
import { User } from '../../types/types'

function Users() {
	const [activeUserId, setActiveUserId] = useState<string>()

	const router = useRouter()

	useEffect(() => {
		if (router.query.id) {
			setActiveUserId(router.query.id as string)
		}
	}, [router])

	return (
		<div className='w-full h-full select-none overflow-hidden'>
			<p className='text-blue-dark h-[45px] text-[30px] font-bold mb-4'>Users</p>

			<div className='w-full h-[calc(100%_-_65px)] flex gap-4'>
				<UserList setActiveUserId={setActiveUserId} activeUserId={activeUserId} />
				{activeUserId && <UserOverview userId={activeUserId} />}
			</div>
		</div>
	)
}

Users.getLayout = function getLayout(page: ReactElement) {
	return (
		<PageWrapper>
			<Head>
				<title>Users</title>
			</Head>

			{page}
		</PageWrapper>
	)
}

export default Users
