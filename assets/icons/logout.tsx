

import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {

}

function LogoutIcon({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <g id="log-out" transform="translate(-2 -2)">
          <path id="Path_1256" data-name="Path 1256" d="M9,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H9A1,1,0,0,1,9,4H5A1,1,0,0,0,4,5V19a1,1,0,0,0,1,1H9a1,1,0,0,1,0,2Z" fill="#33384f" />
          <path id="Path_1257" data-name="Path 1257" d="M16,18a1,1,0,0,1-.707-1.707L19.586,12,15.293,7.707a1,1,0,0,1,1.414-1.414l5,5a1,1,0,0,1,0,1.414l-5,5A1,1,0,0,1,16,18Z" fill="#33384f" />
          <path id="Line_176" data-name="Line 176" d="M12,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H12a1,1,0,0,1,1,1A1,1,0,0,1,12,1Z" transform="translate(9 12)" fill="#33384f" />
        </g>
      </svg>

    </div>
  )
}

export default LogoutIcon