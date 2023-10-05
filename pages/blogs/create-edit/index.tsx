import { useFormik } from 'formik'
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import Button from '../../../components/core/button'
import PageWrapper from '../../../components/core/page-wrapper'
import ValidationInput from '../../../components/core/validation-input'
import BlogService from '../../../services/blog'
import { snackAtom } from '../../../stores/atoms'
import errorPopupParser from '../../../utils/error-popup-parser'
import getImage from '../../../utils/getImage'
import { FileService } from '../../../utils/uploadImage'
import PrevIcon from '../../../assets/icons/prevIcon.'
import BlogPreviewModel from '../../../components/modals/blog-preview-model'
const SunEditorComponent = dynamic(() => import('../../../components/sun-editor/sun-editor'), { ssr: false })

function BlogEditor() {
	const router = useRouter()
	const { id } = router.query
	const [, setSnack] = useAtom(snackAtom)
	const [keyword, setKeyword] = useState('')
	// const debouncedKeyword = useDebounce(keyword, 600)
	const [imageBlobUrl, setImageBlobUrl] = useState('')
	const [imageFile, setImageFile] = useState('')
	const [preview, setPreview] = useState<boolean>(false)
	// const [blog,setBlog] = useState<any>({})

	const { data: blog, isLoading, isFetched } = useQuery(['singleBlog', id], () => BlogService.getBlog(id?.toString()), {
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
			if (!id) {
				postBlog.mutate({
					image: values.image,
					category: values.category,
					metaTitle: values.metaTitle,
					metaDesc: values.metaDesc,
					bannerTitle: values.bannerTitle,
					contentTitle: values.contentTitle,
					contentBody: values.contentBody
				})
			}
			else {
				updateBlog.mutate({
					blogId: id,
					blog: {
						image: values.image,
						category: values.category,
						metaTitle: values.metaTitle,
						metaDesc: values.metaDesc,
						bannerTitle: values.bannerTitle,
						contentTitle: values.contentTitle,
						contentBody: values.contentBody
					}
				})
			}

		},
	})

	const postBlog = useMutation(BlogService.createBlog, {
		onSuccess: (result) => {
			setSnack({
				isOpen: true,
				message: 'Blog created successfully',
				severity: 'success',
			})
			router.push('/blogs')
		},
		onError: (err) => {
			errorPopupParser(err, setSnack)
		},
	})

	const updateBlog = useMutation(BlogService.updateBlog, {
		onSuccess: (result) => {
			setSnack({
				isOpen: true,
				message: 'Blog updated successfully',
				severity: 'success',
			})
			router.push('/blogs')

		},
		onError: (err) => {
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
		setFieldValue('image', fileLink)
	}
	const getSuneditor = (value: string | undefined) => {
		return <SunEditorComponent content={value} setFieldValue={setFieldValue} />
	}
	return (
		<div className='w-full h-full select-none'>
			<p className='text-blue-dark h-[45px] text-[30px] font-bold mb-4'>Blogs</p>
			<div className='w-full h-[calc(100%_-_65px)] flex gap-4'>
				<BlogPreviewModel values={values} isOpen={preview} onClose={() => setPreview(false)} />
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
									{(values.image || imageBlobUrl !== '') && (<div className='ml-5'>
										<Image className='rounded-lg' src={imageBlobUrl || getImage(values.image)} height={66} width={66} />
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
								{!isLoading && isFetched && getSuneditor(blog?.contentBody || values.contentBody)}
							</div>
						</div>
						<div className='flex  justify-center mt-8 gap-5'>
							<Button icon={<PrevIcon />} text="Preview" onClick={() => { setPreview(true) }} className='mb-8 py-2 rounded-md text-white bg-blue-dark border-blue-dark border-2 font-bold w-fit hover:bg-blue-dark' />
							<Button text={!id ? 'Create Blog' : 'Update Blog'} onClick={handleSubmit} className='mb-8 py-2 rounded-md text-white bg-blue-dark border-blue-dark border-2 font-bold w-fit hover:bg-blue-dark' type='submit' />
						</div>
					</form>
				</div>

			</div>
		</div>
	)
}

BlogEditor.getLayout = function getLayout(page: ReactElement) {
	return (
		<PageWrapper>
			<Head>
				<title>Blog</title>
			</Head>

			{page}
		</PageWrapper>
	)
}

export default BlogEditor