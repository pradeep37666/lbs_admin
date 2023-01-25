

import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {

}

function BlogsIcon({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20">
        <g id="book-open" transform="translate(-1 -2)">
          <path id="Path_1129" data-name="Path 1129" d="M2,2H8a5.006,5.006,0,0,1,5,5V21a1,1,0,0,1-2,0,2,2,0,0,0-2-2H2a1,1,0,0,1-1-1V3A1,1,0,0,1,2,2Zm9,15.537V7A3,3,0,0,0,8,4H3V17H9A3.976,3.976,0,0,1,11,17.537Z" fill={color ?? "#33384f"} />
          <path id="Path_1130" data-name="Path 1130" d="M16,2h6a1,1,0,0,1,1,1V18a1,1,0,0,1-1,1H15a2,2,0,0,0-2,2,1,1,0,0,1-2,0V7A5.006,5.006,0,0,1,16,2Zm5,2H16a3,3,0,0,0-3,3V17.537A3.976,3.976,0,0,1,15,17h6Z" fill={color ?? "#33384f"} />
        </g>
      </svg>


    </div>
  )
}

export default BlogsIcon