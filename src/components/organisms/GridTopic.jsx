import React, { useCallback, useContext, useEffect, useState } from 'react'
import Topic from '../molecules/Topic'
import { Link } from 'react-router-dom'
import { deleteTopic } from '../../services/topic.services'
import { getTopic } from '../../services/message.services'
import { useGoogleLogin } from '@react-oauth/google'
import google from '../../assets/images/google.svg'
import DataChatContext from '../context/DataChatContext'
import axios from 'axios'
import { Slide, toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { getConversationByUserId } from '../../services/conversation.services'

function GridTopic() {  
  const {topic, setTopic} = useContext(DataChatContext)
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  
  const {data: dataTopic, isLoading: isLoadingDataTopic} = useQuery({queryKey: ['topic', user?.user_id], queryFn: () => getConversationByUserId(user?.user_id)})
  console.log(dataTopic);

  const handlePopUp = (item) => {
    setToggle(true)
  } 

  const cancelPopup = () => {
    setToggle(false)
  }

  const handleDeleteTopic = async (id) => {
    await deleteTopic(id)
    setToggle(false)
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const data = {
        access_token: tokenResponse.access_token,
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
      }
      axios.post(process.env.REACT_APP_API_URI+'/login', 
        data
      ).then((response) => {
        console.log(response);
        if(response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data.data))
          toast.success(response.data.message, {
            transition: Slide
          })
        }else{
          toast.error(response.data.message, {
            transition: Slide
          })
        }
      }).catch((error) => {
        // toast.error(error.response.data.message, {
        //   transition: Slide
        // })
      })
    },
    onError: (error) => {
      // toast.error(error.message, {
      //   transition: Slide
      // })
    }
  });

  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <div className='flex justify-between flex-col h-full'>
      {/* delete alert in center of screen with blur */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all duration-100 ease-in-out z-20 ${toggle ? '!opacity-100' : 'opacity-0 invisible'}`}>
        <div className='bg-primary-bg rounded-lg w-[50vh]'>
          <div className='p-5'>Delete Chat?</div>
          <hr/>
          <div className=' px-5 py-8 space-y-8'>
          <p>This will delete <span className='font-bold'>{topic.title}</span></p>
          <div className='flex justify-end gap-2'>
            <button className='border hover:bg-secondary-bg border-gray-500 text-white px-3 py-1 rounded-lg text-sm' onClick={() => cancelPopup()}>Cancel</button>
            <button className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm' onClick={() => handleDeleteTopic(topic._id)}>Delete</button>
          </div>
          </div>
        </div>
      </div>

      <div>
        <div className='grid grid-cols-1 px-4 pt-5 text-sm gap-4'>
          <Link to={`/`}>
            <Topic>
              <span>New Chat</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </Topic>
          </Link>
        </div>

        <div className='grid grid-cols-1 px-4 pt-5 text-sm gap-1'>
          {  (topic !== undefined) ?
            topic.map((item, index) => {
              return (
                <Topic key={index}>
                    <Link to={`/chat/${item.id}`} className='w-full'>
                      <span>{item.title.length > 25 ? item.title.substring(0,25) + '...' : item.title}</span> 
                    </Link>
                    <div className='group-hover:text-gray-500 text-secondary-bg' onClick={() => handlePopUp(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 hover:text-gray-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </div>
                  </Topic>
              )
            }) : null
          }

          {/* loading */}
          {
            loading ?
            <div className='flex justify-center items-center'>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-bg"></div>
            </div>
            :
            null
          }
        </div>
      </div>

      <div className=' px-4'>
        {/* <button onClick={() => checkLoginState()}>Google Auth</button> */}
        <button onClick={() => login()} type="button" className={`w-full block py-2 px-1 md:px-3 text-center border rounded-md text-base font-semibold flex justify-center space-x-1 md:space-x-2 duration-300  bg-transparent border border-black-500 hover:bg-primary-200 hover:border-transparent`}>
          <img src={google} alt="" />
          <span>
            Login dengan Google
          </span>
        </button>
      </div>
    </div>
  )
}

export default GridTopic