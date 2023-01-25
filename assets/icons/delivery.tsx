

import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {

}

function Delivery({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20">
        <g id="truck" transform="translate(0 -2)">
          <path id="Rectangle_3163" data-name="Rectangle 3163" d="M0-1H15a1,1,0,0,1,1,1V13a1,1,0,0,1-1,1H0a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1ZM14,1H1V12H14Z" transform="translate(1 3)" fill="#ac172c" />
          <path id="Path_1356" data-name="Path 1356" d="M16,7h4a1,1,0,0,1,.707.293l3,3A1,1,0,0,1,24,11v5a1,1,0,0,1-1,1H16a1,1,0,0,1-1-1V8A1,1,0,0,1,16,7Zm3.586,2H17v6h5V11.414Z" fill="#ac172c" />
          <path id="Ellipse_706" data-name="Ellipse 706" d="M2.5-1A3.5,3.5,0,1,1-1,2.5,3.5,3.5,0,0,1,2.5-1Zm0,5A1.5,1.5,0,1,0,1,2.5,1.5,1.5,0,0,0,2.5,4Z" transform="translate(3 16)" fill="#ac172c" />
          <path id="Ellipse_707" data-name="Ellipse 707" d="M2.5-1A3.5,3.5,0,1,1-1,2.5,3.5,3.5,0,0,1,2.5-1Zm0,5A1.5,1.5,0,1,0,1,2.5,1.5,1.5,0,0,0,2.5,4Z" transform="translate(16 16)" fill="#ac172c" />
        </g>
      </svg>


    </div>
  )
}

export default Delivery