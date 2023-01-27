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

const authRoutes = ['/blogs']
const notAuthRoutes = ['/login']

function AuthProvider({ children }: Props) {
	const [, setAdmin] = useAtom(adminAtom)
	const [isLoadingUser, setIsLoadingUser] = useState(true)
	// const [token, setToken] = useState<string | null>(null)
	const router = useRouter()

	// const userResult = useQuery(['user', user], AuthService.getMe, {
	//     retry: 1,
	//     enabled: !!token,
	//     onSuccess: (data) => {
	//         setAdmin(data)
	//     }
	// })

	const getAdminData = async (): Promise<Admin | undefined> => {
		try {
			const [adminData] = await Promise.all([
				AuthService.getMe(),
				// asyncTimeout(2000)
			])

			setAdmin(adminData.user)

			return adminData.user
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
			setIsLoadingUser(false)
			setAdmin(undefined)
			if (isAuthRoute) router.replace('/login')
			return
		}
		const admin = await getAdminData()

		if (isNotAuthRoute && admin) router.replace('/')

		setIsLoadingUser(false)
	}

	useEffect(() => {
		handleProtectRoutes()
	}, [])

	if (isLoadingUser) return <Loading />
	// if (userResult.isLoading) return <Loading />

	// const isAuthRoute = authRoutes.includes(router.route)
	// const isNotAuthRoute = notAuthRoutes.includes(router.route)

	return <>{children}</>
}

export default AuthProvider
