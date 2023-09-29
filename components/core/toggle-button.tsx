import React, { useState } from 'react'

type ToggleType = {
    handleChange : (id:string,value:boolean) =>void
    id:string
}

const ToggleButton = (props:any) => {
  const [isChecked, setIsChecked] = useState(!props?.blog?.isDraft)

  const handleCheckboxChange =(e:any)=>{
    setIsChecked(e.target.checked)
    props.handleChange({id:props.blog.id ,value:e.target.checked})
  }
  return (
    <>
      <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <span className='label flex items-center text-base	 font-medium text-black'>
          Draft
        </span>
        <span
          className={`slider mx-2 flex h-6 w-[43px] items-center rounded-full p-0 duration-200 ${
            isChecked ? 'bg-[#212b36]' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-5 w-5 rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-[20px]' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-base	 font-medium text-black'>
          Publish
        </span>
      </label>
    </>
  )
}

export default ToggleButton