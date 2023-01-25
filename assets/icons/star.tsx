

import React from 'react'
import { IconBaseProps } from '../../types/types'

interface Props extends IconBaseProps {

}

function Star({ className, onClick, color }: Props) {

  return (
    <div className={`${onClick ? 'cursor-pointer hover:scale-110 hover:rotate-3 transition-all duration-300 ' : ' '}` + className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" id="Group_195" data-name="Group 195" width="25.293" height="23.953" viewBox="0 0 25.293 23.953">
        <path id="Path_79" data-name="Path 79" d="M586.785,670.648a1.246,1.246,0,0,0-1.174-.875l-7.693-.156-2.525-7.183a1.262,1.262,0,0,0-2.381,0l-2.524,7.185-7.7.156a1.263,1.263,0,0,0-.73,2.272l6.121,4.593-2.222,7.27a1.239,1.239,0,0,0,.186,1.113,1.279,1.279,0,0,0,1.025.521,1.252,1.252,0,0,0,.711-.224l6.321-4.352,6.322,4.352a1.255,1.255,0,0,0,.71.224h0a1.281,1.281,0,0,0,1.023-.521,1.242,1.242,0,0,0,.186-1.113l-2.224-7.27,6.122-4.594A1.244,1.244,0,0,0,586.785,670.648Z" transform="translate(-561.556 -661.59)" fill="#e9d8b4" />
      </svg>
    </div>
  )
}

export default Star