import { useFormik } from 'formik';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Button from '../../../components/core/button';
import Sidebar from '../../../components/core/sidebar';
import ValidationInput from '../../../components/core/validation-input';
import BlogService from '../../../services/blog';
import { snackAtom } from '../../../stores/atoms';
import errorPopupParser from '../../../utils/error-popup-parser';
import { FileService } from '../../../utils/uploadImage';
const SunEditorComponent = dynamic(() => import('../../../components/sun-editor/sun-editor'), { ssr: false })


const NUM_ITEMS_PER_SEARCH = 10
function Blogs() {
	const router = useRouter()
	const {id} =router.query
	const [, setSnack] = useAtom(snackAtom)
	const [keyword, setKeyword] = useState('')
	// const debouncedKeyword = useDebounce(keyword, 600)
	const [imageBlobUrl, setImageBlobUrl] = useState('')
	const [imageFile, setImageFile] = useState('')
	// const [blog,setBlog] = useState<any>({})
	
	 const { data: blog } = useQuery(['singleBlog', id], () => BlogService.getBlog(id?.toString()), {
		onError: (err) => errorPopupParser(err, setSnack),
	})	 

	const { values, errors, touched, setFieldValue, handleSubmit } = useFormik({
		initialValues: blog || { 
			image: '',
			category: '',
			metaTitle: '',
			metaDesc: '',
			bannerTitle: '',
			contentTitle: '',
			contentBody: ''
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			postBlog.mutate({ 
				image: values.image,
				category:values.category,
				metaTitle: values.metaTitle,
			metaDesc: values.metaDesc,
			bannerTitle: values.bannerTitle,
			contentTitle: values.contentTitle,
			contentBody: values.contentBody			
			})
		},
	})

	const postBlog = useMutation(BlogService.createBlog, {
		onSuccess: (result) => {
		},
		onError: (err) =>{
			errorPopupParser(err, setSnack)
		},
	})
	const handleChange = async ({ target }: any) => {
		setImageFile(target.value)
		const file = target.files[0]

		if (target.files.length === 0) return
		const fileLink = await FileService.uploadSingleImage(file)
		if (!fileLink) return
		setImageBlobUrl(URL.createObjectURL(file))
		setFieldValue('image',fileLink)


	}

	return (
		<div className='w-screen h-screen bg-grey-light flex'>
			<Sidebar />

			<div className='w-[calc(100%_-_240px)] bg-grey-light py-6 px-12 flex flex-col'>
				<p className='text-[16px] text-blue-dark pl-8 mb-2'>
					Welcome back, <span className='font-bold '>Sarmuhabat</span> 👋
				</p>
				<div>
					<form>
						<div className='flex gap-16 justify-center '>
							<div className='min-w-min'>

								<ValidationInput
									placeholder='Banner Title'
									className='mb-3'
									error={errors.bannerTitle}
									touched={touched.bannerTitle}
									value={values.bannerTitle}
									onChange={(e) => setFieldValue('bannerTitle', e.target.value)}
								/>
								<ValidationInput
									placeholder='Title description'
									// inputType='password'
									className='mb-4'
									error={errors.contentTitle}
									touched={touched.contentTitle}
									value={values.contentTitle}
									onChange={(e) => setFieldValue('contentTitle', e.target.value)}
								/>


								<ValidationInput
									placeholder='Meta Title'
									className='mb-3'
									error={errors.metaTitle}
									touched={touched.metaTitle}
									value={values.metaTitle}
									onChange={(e) => setFieldValue('metaTitle', e.target.value)}
								/>
								<ValidationInput
									placeholder='Meta description'
									// inputType='password'
									className='mb-4'
									error={errors.metaDesc}
									touched={touched.metaDesc}
									value={values.metaDesc}
									onChange={(e) => setFieldValue('metaDesc', e.target.value)}
								/>

								<div className='flex  justify-space-between'>
									<ValidationInput
										placeholder='Upload Image'
										inputType='file'
										className='mb-4'
										error={errors.image}
										touched={touched.image}
										value={imageFile}
										onChange={(e) => handleChange(e)}
									/>
									{imageBlobUrl !== '' && (<div className='ml-5'>
										<Image className='rounded-lg' src={imageBlobUrl} height={66} width={66} />
									</div>)}

								</div>

								<ValidationInput
									placeholder='Categories seperated with comma'
									className='mb-4'
									error={errors.category}
									touched={touched.category}
									value={values.category}
									onChange={(e) => setFieldValue('category', e.target.value)}
								/>

							</div>
							<div className='remove-all'>
								{/* <JoditEditorComponent setFieldValue={setFieldValue} /> */}
								{/* <JoditEditorComponent value={''} onChange={(text:any)=>{console.log("---yy---",text);
								}}  /> */}
								<SunEditorComponent setFieldValue={setFieldValue} />
							</div>
						</div>
						<div className='flex  justify-center mt-8'>
							<div className='w-[340px] '>
								<Button text='Post' onClick={handleSubmit} className='mb-8' type='submit' />
							</div>

						</div>
					</form>
				</div>

			</div>
			
		</div>

	)
}


export default Blogs