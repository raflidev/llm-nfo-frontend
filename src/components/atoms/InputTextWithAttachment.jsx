import React, { useContext } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import DataChatContext from '../context/DataChatContext';
import IconLoading from './Icon/IconLoading';

function InputTextWithAttachment(props) {
  const { step, setStep} = useContext(DataChatContext)
  const { text,setText, handleChange, loading, submitHandler, toggle, setToggle } = props
  return (
    <div className='bg-gray-50 w-full flex items-center rounded-md pr-4 '>
      <TextareaAutosize maxRows={3}  value={text} onChange={(e) => handleChange(e)} minRows={1} className={`w-full rounded-md resize-none border-none outline-none overflow-hidden p-2 px-4 duration-200 text-black  ${loading ? 'primary-bg' : 'bg-gray-50'}` } disabled={loading} placeholder={`${loading ? 'Loading...': 'Type a message'}`}  />
      {/* <textarea type="text" /> */}
      <div className="">
        <div className='h-full flex items-center space-x-3'>
          {
            !loading && (step === 3) ?
            <button className='text-gray-800 hover:bg-gray-300 rounded-full p-1' onClick={() => setToggle(!toggle)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
              </svg>
            </button>
            :
            ''
          }
          {
            !loading ?
            <button className={`rounded p-1 ${text.length === 0 ? 'text-primary-bg bg-gray-400' : 'bg-blue-500 '}`} onClick={(e) => submitHandler(e)} disabled={text.length === 0}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
            </button>
            :
            <div className='bg-gray-400 flex justify-center p-1 rounded'>
              <IconLoading/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default InputTextWithAttachment