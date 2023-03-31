import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import AuthService from '../../services/auth'
import { adminAtom } from '../../stores/atoms'
import { Admin, User } from '../../types/types'
import Loading from './loading'

type Props = {
	children: ReactNode[]
}

const authRoutes = ['/blogs', 'disputes', '/items', '/support', '/users']
const notAuthRoutes = ['/login']

function AuthProvider({ children }: Props) {
	const [, setAdmin] = useAtom(adminAtom)
	const [isLoadingUser, setIsLoadingUser] = useState(true)
	const router = useRouter()

	const getAdminData = async (): Promise<Admin | undefined> => {
		try {
			const [adminData] = await Promise.all([AuthService.getMe()])

			setAdmin(adminData)

			return adminData
		} catch (error) {
			setAdmin(undefined)
			localStorage.removeItem('LBS_Admin_Token')
		}
	}

	const handleProtectRoutes = async () => {
		const token = localStorage.getItem('LBS_Admin_Token')

		const isAuthRoute = authRoutes.includes(router.route)
		const isNotAuthRoute = notAuthRoutes.includes(router.route)

		if (!token) {
			setAdmin(undefined)
			if (isAuthRoute) router.replace('/login')
			setIsLoadingUser(false)
			return
		}
		const admin = await getAdminData()

		console.log(isNotAuthRoute, admin)

		if (isNotAuthRoute && admin) {
			console.log('ye')
			router.replace('/items')
		}

		setIsLoadingUser(false)
	}

	useEffect(() => {
		handleProtectRoutes()
	}, [])

	if (isLoadingUser) return <Loading />

	return <>{children}</>
}

export default AuthProvider
