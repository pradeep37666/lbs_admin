import { ChangeEvent, ReactNode } from 'react'
import { HTMLInputTypeAttribute } from 'react'

type Props = {
    placeholder?: string
    className?: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: 'NUMBER' | 'TEXT' 
    inputType?: HTMLInputTypeAttribute
    icon?: ReactNode
    error?: string
    touched?: boolean
}

function ValidationInput({ placeholder, className, value, onChange, type, inputType, icon, error, touched }: Props): JSX.Element {

    const validateIsNumber = (e: ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) return
        onChange(e)
    }

    return <div className='relative w-full'>
        <input className={`input-primary ` + className} type={inputType} placeholder={placeholder} value={value} onChange={e => type === 'NUMBER' ?
        validateIsNumber(e)
        : onChange(e)} />
        {icon && <div className='absolute right-2 top-[15px]'>{icon}</div>}
        {error && touched && <div className='bg-error-base p-2 text-white border-[1px] border-grey-base88 rounded-lg mb-4 text-[14px]'>{error}</div>}

    </div>
    
}

export default ValidationInput
