import * as Yup from 'yup'
import { PhoneNumberUtil } from 'google-libphonenumber'

const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.^,/'"(){}|;:+=_\-\\[\]<>`])[A-Za-z\d@$!%*#?&.^,/'"(){}|;:+=_\-\\[\]<>`]{8,}$/

// needs further support for countries outside AU
const validatePhoneNumber = (value: string | undefined) => {
    let result = false
    try {
        const phoneUtil = PhoneNumberUtil.getInstance()
        result = phoneUtil.isValidNumber(phoneUtil.parse(value, 'AU'))
    } catch (e) {
        result = false
    }
    return result
}

// example schema
export const signupSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid Email').required('Required'),
    mobile: Yup.string().required('Required').test('test-ctype', 'Invalid Phone Number', (value) => validatePhoneNumber(value)),
    password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters').matches(passwordRegExp, 'Password must contain 1 number and one special character')
})