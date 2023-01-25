

import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {

}

function ItemsIcon({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18.364" height="20.271" viewBox="0 0 18.364 20.271">
        <g id="package" transform="translate(-2 -1.002)">
          <path id="Line_200" data-name="Line 200" d="M8.181,5.6a.914.914,0,0,1-.458-.123L-.541.714A.918.918,0,0,1-.877-.541.918.918,0,0,1,.377-.877L8.64,3.888A.918.918,0,0,1,8.181,5.6Z" transform="translate(7.132 4.029)" fill={color ?? "#33384f"} />
          <path id="Path_1277" data-name="Path 1277" d="M11.182,21.2A2.758,2.758,0,0,1,9.8,20.829L3.381,17.158A2.764,2.764,0,0,1,2,14.774V7.427A2.763,2.763,0,0,1,3.377,5.044L9.808,1.369a2.754,2.754,0,0,1,2.751,0l6.424,3.671a2.764,2.764,0,0,1,1.381,2.385v7.346a2.763,2.763,0,0,1-1.377,2.384l-6.431,3.675A2.754,2.754,0,0,1,11.182,21.2Zm0-18.36a.919.919,0,0,0-.459.123L4.292,6.636a.919.919,0,0,0-.456.792v7.344a.92.92,0,0,0,.459.793l6.424,3.671a.918.918,0,0,0,.922,0l6.431-3.675a.919.919,0,0,0,.456-.792V7.427a.92.92,0,0,0-.459-.793L11.644,2.963A.923.923,0,0,0,11.182,2.838Z" fill={color ?? "#33384f"} />
          <path id="Path_1278" data-name="Path 1278" d="M11.2,12.433a.918.918,0,0,1-.46-.123L2.728,7.673a.918.918,0,0,1,.919-1.59L11.2,10.454,18.76,6.083a.918.918,0,0,1,.919,1.59L11.664,12.31A.918.918,0,0,1,11.2,12.433Z" transform="translate(-0.022 -0.406)" fill={color ?? "#33384f"} />
          <path id="Line_201" data-name="Line 201" d="M-.082,10.092A.918.918,0,0,1-1,9.173V-.082A.918.918,0,0,1-.082-1a.918.918,0,0,1,.918.918V9.173A.918.918,0,0,1-.082,10.092Z" transform="translate(11.264 11.182)" fill={color ?? "#33384f"} />
        </g>
      </svg>
    </div>
  )
}

export default ItemsIcon