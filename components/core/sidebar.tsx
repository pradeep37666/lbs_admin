import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React from 'react'
import BlogsIcon from '../../assets/icons/blogs'
import ItemsIcon from '../../assets/icons/items'
import LogoutIcon from '../../assets/icons/logout'
import NoticeBoardIcon from '../../assets/icons/notice-board'
import UsersIcon from '../../assets/icons/users'
import LogoRed from '../../assets/logos/logo-red'
import { adminAtom } from '../../stores/atoms'

function Sidebar() {
	const router = useRouter()
	const [, setAdmin] = useAtom(adminAtom)

	const currentRoute = router.pathname

	const isItems = currentRoute === '/items'
	const isNoticeBoard = currentRoute === '/support' || currentRoute === '/disputes'
	const isSupport = currentRoute === '/support'
	const isDisputes = currentRoute === '/disputes'
	const isBlogs = currentRoute === '/blogs' || currentRoute.split("/").includes("blogs")
	const isUsers = currentRoute === '/users'

	const logoutAdmin = () => {
		localStorage.removeItem('LBS_Admin_Token')
		setAdmin(undefined)
		router.push('/login')
	}

	return (
		<div className='h-screen w-[240px] bg-nav-bg bg-no-repeat bg-cover p-8 select-none flex flex-col'>
			<LogoRed className='mb-8' />

			<div className='overflow-y-auto' style={{
				height: "calc(100vh - 179px)"
			}}>
				<div
					onClick={() => router.push('/items')}
					className={`${isItems ? 'text-red-base' : 'sidebar-text sidebar-hover-bg'
						} flex gap-2 items-center cursor-pointer font-bold text-[20px] mb-6`}
				>
					<ItemsIcon color={isItems ? '#AC172C' : undefined} />
					<p>Items</p>
				</div>

				<div
					onClick={() => router.push('/support')}
					className={`${isNoticeBoard ? 'text-red-base' : 'sidebar-text sidebar-hover-bg'
						} flex gap-2 items-center cursor-pointer font-bold text-[20px] mb-2`}
				>
					<NoticeBoardIcon color={isNoticeBoard ? '#AC172C' : undefined} />
					<p>Notice Board</p>
				</div>

				<div className='flex gap-6 pl-2 mb-2'>
					<div className={`border-r-[1px] ${isNoticeBoard ? 'border-red-base' : 'border-black'}`} />

					<div className='py-4 w-full'>
						<p
							onClick={() => router.push('/support')}
							className={`${isSupport ? 'text-red-base' : 'sidebar-text sidebar-hover-bg'} font-[16px] cursor-pointer mb-6`}
						>
							Support
						</p>
						<p
							onClick={() => router.push('/disputes')}
							className={`${isDisputes ? 'text-red-base' : 'sidebar-text sidebar-hover-bg'} font-[16px] cursor-pointer`}
						>
							Disputes
						</p>
					</div>
				</div>

				<div
					onClick={() => router.push('/blogs')}
					className={`${isBlogs ? 'text-red-base' : 'sidebar-text sidebar-hover-bg'
						} flex gap-2 items-center cursor-pointer font-bold text-[20px] mb-6 `}
				>
					<BlogsIcon color={isBlogs ? '#AC172C' : undefined} />
					<p>Blogs</p>
				</div>

				<div
					onClick={() => router.push('/users')}
					className={`${isUsers ? 'text-red-base' : 'sidebar-text sidebar-hover-bg'
						} flex gap-2 items-center cursor-pointer font-bold text-[20px] mb-6`}
				>
					<UsersIcon color={isUsers ? '#AC172C' : undefined} />
					<p>Users</p>
				</div>

				<div
					className='mt-auto flex gap-2 items-center cursor-pointer font-bold text-[20px] text-blue-dark hover:scale-105 transition-all duration-300 '
					onClick={logoutAdmin}
				>
					<LogoutIcon />
					<p>Logout</p>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
