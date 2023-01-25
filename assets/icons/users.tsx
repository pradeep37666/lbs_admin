

import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {

}

function UsersIcon({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20">
        <g id="users" transform="translate(0 -2)">
          <path id="Path_1372" data-name="Path 1372" d="M17,22a1,1,0,0,1-1-1V19a3,3,0,0,0-3-3H5a3,3,0,0,0-3,3v2a1,1,0,0,1-2,0V19a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5v2A1,1,0,0,1,17,22Z" fill={color ?? "#33384f"} />
          <path id="Ellipse_713" data-name="Ellipse 713" d="M4-1A5,5,0,1,1-1,4,5.006,5.006,0,0,1,4-1ZM4,7A3,3,0,1,0,1,4,3,3,0,0,0,4,7Z" transform="translate(5 3)" fill={color ?? "#33384f"} />
          <path id="Path_1373" data-name="Path 1373" d="M23,22a1,1,0,0,1-1-1V19a3,3,0,0,0-2.25-2.9,1,1,0,1,1,.5-1.937A5,5,0,0,1,24,19v2A1,1,0,0,1,23,22Z" fill={color ?? "#33384f"} />
          <path id="Path_1374" data-name="Path 1374" d="M16,11.88a1,1,0,0,1-.247-1.969,3,3,0,0,0,0-5.812,1,1,0,0,1,.5-1.937,5,5,0,0,1,0,9.688A1,1,0,0,1,16,11.88Z" fill={color ?? "#33384f"} />
        </g>
      </svg>


    </div>
  )
}

export default UsersIcon