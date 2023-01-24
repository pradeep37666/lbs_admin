import { PhoneNumberUtil } from 'google-libphonenumber'


const parseMobileNumber = (number: string, countryCode: string) => {

    try {
        const phoneUtil = PhoneNumberUtil.getInstance()
        let result = phoneUtil.parse(number, countryCode)
        console.log(result.getNationalNumberOrDefault().toString())
        return result.getNationalNumberOrDefault().toString()
    } catch (e) {
        throw Error('invalid number')
    }
}

export default parseMobileNumber