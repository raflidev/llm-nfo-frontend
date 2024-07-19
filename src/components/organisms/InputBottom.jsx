import React from 'react'
import InputTextWithAttachment from '../atoms/InputTextWithAttachment'

export default function InputBottom(props) {
  const { setText, text, handleChange, submitHandler, loading, toggle, setToggle } = props

  return (
    <div className='fixed bottom-5 left-10 md:-right-3 w-10/12 md:w-8/12'>
      <div className='flex'>
        <div className='flex w-full md:w-8/12'>
          <InputTextWithAttachment setText={setText} text={text} handleChange={handleChange} loading={loading} submitHandler={submitHandler} toggle={toggle} setToggle={setToggle} />
          {/* <ButtonSend submitHandler={submitHandler} loading={loading} /> */}
        </div>
      </div>
    </div>
  )
}
