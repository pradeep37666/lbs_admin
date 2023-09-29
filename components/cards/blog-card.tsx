import React, { useState } from 'react'
import getImage from '../../utils/getImage'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import ToggleButton from '../core/toggle-button'
import EditIcon from '../../assets/icons/edit'
import PrevIcon from '../../assets/icons/prevIcon.';
import { useMutation } from 'react-query'
import BlogService from '../../services/blog'
import errorPopupParser from '../../utils/error-popup-parser'
import { snackAtom } from '../../stores/atoms'
import { useAtom } from 'jotai'
import { publishBlog } from '../../types/types'




const BlogCard = ({ blog }: any) => {
    const [, setSnack] = useAtom(snackAtom)
    const [isPublish,setIsPublish] = useState<publishBlog>()     
   const handleChange = (data:any)=>{
    updateBlog.mutate({
        blogId : data.id,
        blog : {
           isDraft:data.value
        }
    })  
   }
    	const updateBlog = useMutation(BlogService.updateBlog, {
		onSuccess: (result) => {
			setSnack({
				isOpen: true,
				message: 'Blog updated successfully',
				severity: 'success',
			})
		},
		onError: (err) => {
			errorPopupParser(err, setSnack)
		},
	})

    return (

        <div className="max-w-lg">
            <div className="bg-white shadow-md rounded-lg max-w-sm mb-5 relative">
                <div className=" rounded-t-lg h-200  w-400 ">
                    <Image src={getImage(blog.image)} width={400} height={200} className='rounded-sm w-[60px] h-[60px]' alt='' />
                    {/* <Image className="w-full h-full " src={getImage(blog.image)} alt="" width={400} height={200}  objectFit='cover' /> */}
                </div>
                <div className="p-5">
                    <h5 className="text-gray-900 font-bold text-lg text-2xl tracking-tight mb-2 whitespace-nowrap text-ellipsis overflow-hidden"> {blog.metaTitle}</h5>
                    <p className="font-normal text-bold font-semibold mb-3 h-12"> {blog?.category?.split(",").join(' / ')}</p>
                    <p className="font-normal text-gray-700 mb-3">   {blog.metaDesc}</p>

                    <div className='flex justify-between items-center	'>
                        <div>
                            {moment(blog.updatedAt).format("l")}
                            <div className='mt-2'>
                                <ToggleButton blog={blog} handleChange={handleChange} />
                            </div>
                        </div>
                        <div>

                            <div >
                                <Link className="text-red-base"
                                    href={{
                                        pathname: '/blogs/create-edit/',
                                        query: { id: blog.id } // the data
                                    }}
                                ><span><EditIcon /></span></Link>

                                <div className='mt-2'><PrevIcon /></div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
function setSnack(arg0: { isOpen: boolean; message: string; severity: string }) {
    throw new Error('Function not implemented.')
}

