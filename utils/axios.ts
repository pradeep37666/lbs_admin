import axios from 'axios'

const Instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 12000,
})

Instance.interceptors.request.use(async (req) => {
	const token = localStorage.getItem('LBS_Admin_Token')

	if (!token || !req.headers) return req

	req.headers.Authorization = `Bearer ${token}`

	return req
})

export default Instance
