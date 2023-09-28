import Head from 'next/head'
import { ReactElement, useState } from 'react'
import PageWrapper from '../../components/core/page-wrapper'
import { useAtom } from 'jotai'
import { blogAtom, snackAtom } from '../../stores/atoms'
import useDebounce from '../../utils/use-debounce'
import { useInfiniteQuery } from 'react-query'
import BlogService from '../../services/blog'
import errorPopupParser from '../../utils/error-popup-parser'
import getItemsFromPagination from '../../utils/get-items-from-pagination'
import BlogCard from '../../components/cards/blog-card'
import BlogsIcon from '../../assets/icons/blogs'
import router from 'next/router'

const NUM_ITEMS_PER_SEARCH = 15
function Blogs() {
	const [, setSnack] = useAtom(snackAtom)
	const [, setBlog] = useAtom(blogAtom)
	const [keyword, setKeyword] = useState('')
	const debouncedKeyword = useDebounce(keyword, 600)

	const {
		data: blogPaginated,
		isFetching: blogIsFetching,
		fetchNextPage: fetchNextUsers,
	} = useInfiniteQuery(
		['users', debouncedKeyword],
		({ pageParam = 0 }) => BlogService.search(debouncedKeyword, pageParam, NUM_ITEMS_PER_SEARCH),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.nextPage
			},
			onError: (err) => errorPopupParser(err, setSnack),
		}
	)
	const renderItems = () => {
		if (!blogPaginated) return <div> No Blogs found!</div>

		return getItemsFromPagination(blogPaginated.pages)?.data.map((blog: any, index: number) => {
			return (
				<BlogCard
					key={index}
					blog={blog}
					setClickedBlogId={() => {
					}}
				/>
			)
		})
	}

	return (
		<div className='w-full h-full select-none'>
			<p className='text-blue-dark text-[30px] font-bold mb-4'>Blogs</p>
			<div className='w-full min-h-[calc(100%_-_65px)] flex grid grid-cols-4 gap-4 overflow-y-auto'>
				{renderItems()}
			</div>

			<div className="group fixed top-0 right-0 p-2  flex items-end justify-end w-400 h-24 cursor-pointer " onClick={()=> router.push('/blogs/create-edit')}>
				<div className="bg-red-base text-white shadow-xl flex items-center gap-2  p-3 rounded-full z-50   w-400 ">
					<BlogsIcon color='#FFF' />
					<div className='font-semibold'>Create Blog</div>
				</div>

			</div>
		</div>
	)
}

Blogs.getLayout = function getLayout(page: ReactElement) {
	return (
		<PageWrapper>
			<Head>
				<title>Blogs</title>
			</Head>

			{page}
		</PageWrapper>
	)
}

export default Blogs

