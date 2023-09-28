import React from 'react'
import getImage from '../../utils/getImage'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'


const BlogCard = ({ blog, setClickedBlogId }: any) => {

    return (

        <div className="max-w-lg">
            <div className="bg-white shadow-md rounded-lg max-w-sm mb-5">
                <div className=" rounded-t-lg h-200  w-400 ">
                <Image  src={getImage(blog.image)} width={400} height={200} className='rounded-sm w-[60px] h-[60px]' alt='' />
                    {/* <Image className="w-full h-full " src={getImage(blog.image)} alt="" width={400} height={200}  objectFit='cover' /> */}
                </div>
                <div className="p-5">
                    <h5 className="text-gray-900 font-bold text-lg text-2xl tracking-tight mb-2 whitespace-nowrap text-ellipsis overflow-hidden"> {blog.metaTitle}</h5>
                    <p className="font-normal text-bold font-semibold mb-3 h-12"> {blog?.category?.split(",").join(' / ')}</p>
                    <p className="font-normal text-gray-700 mb-3">   {blog.metaDesc}</p>

                    <div className='flex justify-between'>
                        <div>
                            {moment(blog.updatedAt).format("l")}
                        </div>
                        <div className='text-red-base'>
                            <Link className="text-red-base"
                                href={{
                                    pathname: '/blogs/create-edit/',
                                    query: { id: blog.id } // the data
                                }}
                            >Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
