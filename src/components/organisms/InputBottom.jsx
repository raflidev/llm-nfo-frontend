import React from 'react'
import InputText from '../atoms/InputText'
import ButtonSend from '../atoms/ButtonSend'

export default function InputBottom(props) {
  const { setText, text, handleChange, submitHandler, loading, toggle, setToggle } = props

  return (
    <div className='fixed bottom-5 -right-3 md:w-8/12'>
      <div className='flex'>
        <div className='flex w-8/12'>
          <InputText setText={setText} text={text} handleChange={handleChange} loading={loading} submitHandler={submitHandler} toggle={toggle} setToggle={setToggle} />
          {/* <ButtonSend submitHandler={submitHandler} loading={loading} /> */}
        </div>
      </div>
    </div>
  )
}
