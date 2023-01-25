

import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {

}

function Location({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24">
        <g id="map-pin" transform="translate(-2)">
          <path id="Path_1260" data-name="Path 1260" d="M12,0A10.011,10.011,0,0,1,22,10a11.428,11.428,0,0,1-1.528,5.463,21.161,21.161,0,0,1-3.246,4.35,30.343,30.343,0,0,1-4.671,4.019,1,1,0,0,1-1.109,0,30.343,30.343,0,0,1-4.671-4.019,21.161,21.161,0,0,1-3.246-4.35A11.428,11.428,0,0,1,2,10,10.011,10.011,0,0,1,12,0Zm0,21.771c1.9-1.407,8-6.357,8-11.771A8,8,0,0,0,4,10C4,15.413,10.1,20.363,12,21.771Z" fill="#ac172c" />
          <path id="Ellipse_668" data-name="Ellipse 668" d="M3-1A4,4,0,1,1-1,3,4,4,0,0,1,3-1ZM3,5A2,2,0,1,0,1,3,2,2,0,0,0,3,5Z" transform="translate(9 7)" fill="#ac172c" />
        </g>
      </svg>

    </div>
  )
}

export default Location