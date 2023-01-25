

import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {

}

function NoticeBoardIcon({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16.364" height="20" viewBox="0 0 16.364 20">
        <g id="file-text" transform="translate(-3 -1)">
          <path id="Path_1220" data-name="Path 1220" d="M5.727,1H13a.909.909,0,0,1,.643.266L19.1,6.721a.909.909,0,0,1,.266.643V18.273A2.73,2.73,0,0,1,16.636,21H5.727A2.73,2.73,0,0,1,3,18.273V3.727A2.73,2.73,0,0,1,5.727,1Zm6.9,1.818h-6.9a.91.91,0,0,0-.909.909V18.273a.91.91,0,0,0,.909.909H16.636a.91.91,0,0,0,.909-.909V7.74Z" fill={color ?? "#33384f"} />
          <path id="Path_1221" data-name="Path 1221" d="M20,9H14a1,1,0,0,1-1-1V2a1,1,0,0,1,2,0V7h5a1,1,0,0,1,0,2Z" transform="translate(-1.636)" fill={color ?? "#33384f"} />
          <path id="Line_118" data-name="Line 118" d="M6.527,1H-.164A.929.929,0,0,1-1,0,.929.929,0,0,1-.164-1H6.527a.929.929,0,0,1,.836,1A.929.929,0,0,1,6.527,1Z" transform="translate(8 11.9)" fill={color ?? "#33384f"} />
          <path id="Line_119" data-name="Line 119" d="M6.527,1H-.164A.929.929,0,0,1-1,0,.929.929,0,0,1-.164-1H6.527a.929.929,0,0,1,.836,1A.929.929,0,0,1,6.527,1Z" transform="translate(8 15.5)" fill={color ?? "#33384f"} />
          <path id="Path_1222" data-name="Path 1222" d="M10,10H8A1,1,0,0,1,8,8h2a1,1,0,0,1,0,2Z" transform="translate(-0.468 -0.7)" fill={color ?? "#33384f"} />
        </g>
      </svg>

    </div>
  )
}

export default NoticeBoardIcon