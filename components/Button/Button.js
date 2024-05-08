import React from 'react'


const Button = (info) => {
    const {text = "", onClick=()=>{}} = info  

  return (
    <div className='button-gp'>
      <button onClick={onClick} className='button'>{text}</button>
    </div>
  )
}

export default Button