import React, { useState } from 'react'
import Topic from '../molecules/Topic'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import google from '../../assets/images/google.svg'
// import DataChatContext from '../context/DataChatContext'
import { Slide, toast } from 'react-toastify'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { deleteConversationById, getConversationByUserId } from '../../services/conversation.services'
import { loginAuth, logoutAuth } from '../../services/auth.services'
import IconClose from '../atoms/Icon/IconClose'

function GridTopic(props) {
  const {setToggleMenu, toggleMenu} = props
  const {id} = useParams()
  // const {topic, setTopic} = useContext(DataChatContext)
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentItem, setCurrentItem] = useState({})
  const queryClient = new QueryClient()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const {data: dataTopic, isPending: isPendingDataTopic} = useQuery({queryKey: ['topic', user?.user_id], queryFn: () => getConversationByUserId(user?.user_id)})
  
  const navigate = useNavigate()

  const {mutate: mutateLogin, isPending: isPendingLogin} = useMutation({mutationFn: loginAuth, 
    onSuccess: (response) => {
      console.log(response);
        if(response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data))
          setUser(response.data)
          toast.success(response.data.message, {
            transition: Slide
          })
          queryClient.invalidateQueries({queryKey: ['topic']})
        }else{
          toast.error(response.data.message, {
            transition: Slide
          })
        }
    }
  })

  const {mutate: mutateLogout, isPending: isPendingLogout} = useMutation({mutationFn: logoutAuth, 
    onSuccess: (response) => {
        if(response.status === 200) {
          toast.success("Berhasil Logout", {
            transition: Slide
          })
          setTimeout(() => {
            localStorage.clear(); window.location.reload(); window.location.href = '/';
          }, 1000);
        }
    }
  })

  const {mutate: mutateDeleteTopic, isPending: isPendingDeleteTopic} = useMutation({mutationFn: deleteConversationById,
    onSuccess: (response) => {
      console.log(response);
      if(response.status === 200) {
        toast.success(response.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['topic']})
      }else{
        toast.error(response.data.message, {
          transition: Slide
        })
      }
      navigate('/')
      setToggle(false)
    }
  })

  const handlePopUp = (item) => {
    setCurrentItem(item)
    setToggle(true)
  } 

  const cancelPopup = () => {
    setToggle(false)
  }

  const handleDeleteTopic = async () => {
    mutateDeleteTopic(currentItem.conversation_id)
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const data = {
        access_token: tokenResponse.access_token,
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
      }
      mutateLogin(data)
    },
    onError: (error) => {
      // toast.error(error.message, {
      //   transition: Slide
      // })
    }
  });


  const logoutHandle = () => {
    mutateLogout()
    localStorage.clear()
    window.location.reload()
  }


  return (
    <div className='flex justify-between flex-col min-h-screen'>
      {/* delete alert in center of screen with blur */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all duration-100 ease-in-out z-20 ${toggle ? '!opacity-100' : 'opacity-0 invisible'}`}>
        <div className='bg-primary-bg rounded-lg w-[50vh]'>
          <div className='p-5'>Delete Chat?</div>
          <hr/>
          <div className=' px-5 py-8 space-y-8'>
          <p>This will delete <span className='font-bold'>{currentItem.title}</span></p>
          <div className='flex justify-end gap-2'>
            <button className='border hover:bg-secondary-bg border-gray-500 text-white px-3 py-1 rounded-lg text-sm' onClick={() => cancelPopup()}>Cancel</button>
            <button className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm' onClick={() => handleDeleteTopic()}>Delete</button>
          </div>
          </div>
        </div>
      </div>

      <div>
        <div className='flex md:hidden justify-end px-6 pt-4' onClick={() => setToggleMenu(!toggleMenu)}>
          <div className='bg-red-700 rounded'>
            <IconClose/>
          </div>
        </div>
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

        <div className='grid grid-cols-1 px-2 pt-5 text-sm gap-3 overflow-y-auto'>
          {  (dataTopic?.data !== null && !isPendingDataTopic) ?
            dataTopic?.data.map((item, index) => {
              return (
              <div key={index} className='w-full relative'>
                  <Topic key={index} isActive={item.conversation_id === id}>
                    <a href={`/chat/${item.conversation_id}/1`} className="w-full">
                      <div>
                        <span className='block w-full'>{item.title.length > 25 ? item.title.substring(0,25) + '...' : item.title}</span> 
                      </div>
                    </a>
                    <div className='group-hover:text-gray-500 text-secondary-bg absolute z-10 right-5' onClick={() => handlePopUp(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 hover:text-gray-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </div>
                  </Topic>
              </div>
              )
            }) : ''
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

      <div className=' px-4 pb-5'>
        {/* <button onClick={() => checkLoginState()}>Google Auth</button> */}
        {
          user ? 
          <div className='flex flex-col gap-2 space-y-2'>
            <div className='flex space-x-2 items-center'>
              <img src={user.profile_pic_url} className='w-8 rounded-full' alt="" srcSet="" />
              <span>{user.name}</span>
            </div>
            <button className='bg-red-500 text-white px-2 py-1 rounded text-sm' onClick={() => logoutHandle()}>Logout</button>
          </div> 
          
          : 

          <button onClick={() => login()} type="button" className={`w-full py-2 px-1 md:px-3 text-center rounded-md text-base font-semibold flex justify-center space-x-1 md:space-x-2 duration-300  bg-transparent border border-black-500 hover:bg-primary-200 hover:border-transparent`}>
          <img src={google} alt="" />
          <span>
            Login dengan Google
          </span>
          </button>
        }
      </div>
    </div>
  )
}

export default GridTopic