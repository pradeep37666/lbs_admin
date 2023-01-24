import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import AuthService from '../../services/auth'
import { userAtom } from '../../stores/atoms'
import { User } from '../../types/types'
import Loading from './loading'

type Props = {
	children: ReactNode[]
}

const authRoutes = ['/example-auth-route']
const notAuthRoutes = ['/login', '/register']

function AuthProvider({ children }: Props) {
	const [, setUser] = useAtom(userAtom)
	const [isLoadingUser, setIsLoadingUser] = useState(true)
	// const [token, setToken] = useState<string | null>(null)
	const router = useRouter()

	// const userResult = useQuery(['user', user], AuthService.getMe, {
	//     retry: 1,
	//     enabled: !!token,
	//     onSuccess: (data) => {
	//         setUser(data)
	//     }
	// })

	const getUserData = async (): Promise<User | undefined> => {
		try {
			const [userData] = await Promise.all([
				AuthService.getMe(),
				// asyncTimeout(2000)
			])

			setUser(userData)

			return userData
		} catch (error) {
			setUser(undefined)
			localStorage.removeItem('CompetibleToken')
		}
	}

	const handleProtectRoutes = async () => {
		const token = localStorage.getItem('CompetibleToken')

		const isAuthRoute = authRoutes.includes(router.route)
		const isNotAuthRoute = notAuthRoutes.includes(router.route)

		if (!token) {
			setIsLoadingUser(false)
			setUser(undefined)
			if (isAuthRoute) router.replace('/login')
			return
		}
		const businessUser = await getUserData()

		if (isNotAuthRoute && businessUser) router.replace('/')

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
