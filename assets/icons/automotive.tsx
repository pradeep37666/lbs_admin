

import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {

}

function Automotive({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <g id="grid" transform="translate(-2 -2)">
          <path id="Rectangle_3136" data-name="Rectangle 3136" d="M0-1H7A1,1,0,0,1,8,0V7A1,1,0,0,1,7,8H0A1,1,0,0,1-1,7V0A1,1,0,0,1,0-1ZM6,1H1V6H6Z" transform="translate(3 3)" fill="#ac172c" />
          <path id="Rectangle_3137" data-name="Rectangle 3137" d="M0-1H7A1,1,0,0,1,8,0V7A1,1,0,0,1,7,8H0A1,1,0,0,1-1,7V0A1,1,0,0,1,0-1ZM6,1H1V6H6Z" transform="translate(14 3)" fill="#ac172c" />
          <path id="Rectangle_3138" data-name="Rectangle 3138" d="M0-1H7A1,1,0,0,1,8,0V7A1,1,0,0,1,7,8H0A1,1,0,0,1-1,7V0A1,1,0,0,1,0-1ZM6,1H1V6H6Z" transform="translate(14 14)" fill="#ac172c" />
          <path id="Rectangle_3139" data-name="Rectangle 3139" d="M0-1H7A1,1,0,0,1,8,0V7A1,1,0,0,1,7,8H0A1,1,0,0,1-1,7V0A1,1,0,0,1,0-1ZM6,1H1V6H6Z" transform="translate(3 14)" fill="#ac172c" />
        </g>
      </svg>



    </div>
  )
}

export default Automotive