import React from 'react'
import { IconBaseProps } from '../../types/types'


interface Props extends IconBaseProps {

}

function CameraIcon({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="144" height="144" viewBox="0 0 144 144">
  <defs>
    <clipPath id="clip-Camera_icon">
      <rect width="144" height="144"/>
    </clipPath>
  </defs>
  <g id="Camera_icon" data-name="Camera icon" clipPath="url(#clip-Camera_icon)">
    <g id="Group_2446" data-name="Group 2446" transform="translate(0 11)">
      <path id="Path_121" data-name="Path 121" d="M535.281,749.514h-95.5a24.279,24.279,0,0,1-24.25-24.25V676.325a24.279,24.279,0,0,1,24.25-24.25h95.5a24.279,24.279,0,0,1,24.25,24.25v48.939A24.279,24.279,0,0,1,535.281,749.514Zm-95.5-92.42a19.252,19.252,0,0,0-19.227,19.231v48.939a19.249,19.249,0,0,0,19.227,19.227h95.5a19.248,19.248,0,0,0,19.227-19.227V676.325a19.252,19.252,0,0,0-19.227-19.231Z" transform="translate(-415.531 -628.122)" fill="#b03b4b"/>
      <path id="Path_122" data-name="Path 122" d="M428.287,667.1v-.672a15.553,15.553,0,0,1,15.536-15.539h43.172A15.551,15.551,0,0,1,502.53,666.43v.672h5.023v-.672a20.581,20.581,0,0,0-20.559-20.559H443.823a20.581,20.581,0,0,0-20.559,20.559v.672Z" transform="translate(-393.408 -645.871)" fill="#b03b4b"/>
      <path id="Path_123" data-name="Path 123" d="M459.476,724.126a34.137,34.137,0,1,1,34.133-34.137A34.178,34.178,0,0,1,459.476,724.126Zm0-63.252a29.114,29.114,0,1,0,29.114,29.114A29.145,29.145,0,0,0,459.476,660.875Z" transform="translate(-387.472 -617.317)" fill="#b03b4b"/>
      <path id="Path_124" data-name="Path 124" d="M453.164,675.55a10.073,10.073,0,1,1,10.073-10.073A10.085,10.085,0,0,1,453.164,675.55Zm0-16.284a6.212,6.212,0,1,0,6.212,6.212A6.215,6.215,0,0,0,453.164,659.266Z" transform="translate(-336.687 -618.596)" fill="#b03b4b"/>
    </g>
  </g>
</svg>
    </div>
  )
}

export default CameraIcon

