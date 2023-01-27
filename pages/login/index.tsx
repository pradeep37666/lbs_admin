import { useFormik } from 'formik'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation } from 'react-query'
import LogoRed from '../../assets/logos/logo-red'
import Button from '../../components/core/button'
import ValidationInput from '../../components/core/validation-input'
import AuthService from '../../services/auth'
import { adminAtom, snackAtom } from '../../stores/atoms'
import errorPopupParser from '../../utils/error-popup-parser'
import { loginSchema } from '../../utils/validation-schemas'

function Login() {
	const [, setSnack] = useAtom(snackAtom)
	const [, setAdmin] = useAtom(adminAtom)

	const router = useRouter()

	const { values, errors, touched, setFieldValue, handleSubmit } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			loginAdmin.mutate({ email: values.email, password: values.password })
		},
		validationSchema: loginSchema,
	})

	const loginAdmin = useMutation(AuthService.login, {
		onSuccess: (result) => {
			localStorage.setItem('LBS_Admin_Token', result.token.accessToken)
			setAdmin(result.user)
			router.push('/items')
		},
		onError: (err) => errorPopupParser(err, setSnack),
	})

	return (
		<div className='w-screen h-screen bg-grey-light flex items-center justify-center'>
			<div className='w-[40%] min-w-[350px] max-w-[600px] p-[3%] bg-white rounded-2xl border border-grey-base '>
				<LogoRed className='mx-auto w-min mb-6' />
				<p className='text-[20px] text-blue-dark font-bold mb-4'>Log In</p>
				<form>
					<ValidationInput
						placeholder='Email'
						className='mb-3'
						error={errors.email}
						touched={touched.email}
						value={values.email}
						onChange={(e) => setFieldValue('email', e.target.value)}
					/>
					<ValidationInput
						placeholder='Password'
						inputType='password'
						className='mb-4'
						error={errors.password}
						touched={touched.password}
						value={values.password}
						onChange={(e) => setFieldValue('password', e.target.value)}
					/>
					<Button text='Log In' onClick={handleSubmit} className='mb-8' type='submit' />
				</form>
			</div>
		</div>
	)
}

export default Login
