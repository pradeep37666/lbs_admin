

import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {

}

function SearchIcon({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <g id="search" transform="translate(-2 -2)">
          <path id="Ellipse_689" data-name="Ellipse 689" d="M8-1A9,9,0,1,1-1,8,9.01,9.01,0,0,1,8-1ZM8,15A7,7,0,1,0,1,8,7.008,7.008,0,0,0,8,15Z" transform="translate(3 3)" fill="#33384f" />
          <path id="Line_221" data-name="Line 221" d="M4.35,5.35a1,1,0,0,1-.707-.293L-.707.707a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l4.35,4.35A1,1,0,0,1,4.35,5.35Z" transform="translate(16.65 16.65)" fill="#33384f" />
        </g>
      </svg>



    </div>
  )
}

export default SearchIcon