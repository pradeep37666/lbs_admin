import axios from 'axios'

const Instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 12000,
})

Instance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('CHANGE_BOILER')
    
    if (!token || !req.headers) return req

    req.headers.Authorization = `Bearer ${token}`
    
    return req
})

export default Instance