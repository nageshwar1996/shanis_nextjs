import Button from '@/components/Button/Button'
import { SignupScreen } from '@/pages/signin'
import React from 'react'

const Setting = () => {
  return (
    <div className='setting_page'>
      {/* <div className='setting'>
          <div className='title'>
              <p>Update Your Profile</p>
          </div>
          <div className='setting_body'>
              
          </div>
          <div className='submit_button'>
              <Button text="Save"/>
          </div>
      </div> */}

      <SignupScreen isNewAccount={false}/>

    </div>
  )
}

export default Setting