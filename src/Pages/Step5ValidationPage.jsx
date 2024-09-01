import React, { useContext, useEffect, useState } from 'react'
import ValidationDataOnClass from '../components/organisms/ValidationDataOnClass'
import DataChatContext from '../components/context/DataChatContext'
import { deleteDataPropertyByID, postSavedataPropertyByConvID } from '../services/dataProperty.services'
import { redirect, useParams } from 'react-router-dom'
import { Slide, toast } from 'react-toastify'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { deleteObjectPropertyByID, postSaveObjectPropertiesByConvID } from '../services/objectProperty.services'
import { redirectLink } from '../services/utils'

function Step5ValidationPage() {
  
  const [menu, setMenu] = useState(['Data Property', 'Object Property'])
  const [menuActive, setMenuActive] = useState(0)
  const {id} = useParams()


  const {termDP, termOP, setStep} = useContext(DataChatContext)
  const queryClient = new QueryClient()
  
  
  const {mutate: saveItemFuncDP, isPending: isPendingSaveItemDP} = useMutation({mutationFn: postSavedataPropertyByConvID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['class_and_data_property', id]})
      }
    }
  })

  // deleteDataPropertyByID
  const {mutate: deleteItemDP, isPending: isPendingDeleteItemDP} = useMutation({mutationFn: deleteDataPropertyByID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['class_and_data_property', id]})
        // setMenuActive(1)
      }
    }
  })

  const {mutate: deleteItemOP, isPending: isPendingDeleteItemOP} = useMutation({mutationFn: deleteObjectPropertyByID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['class_and_data_property', id]})
        // setMenuActive(1)
      }
    }
  })

  const {mutate: saveItemFuncOP, isPending: isPendingSaveItemOP} = useMutation({mutationFn: postSaveObjectPropertiesByConvID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['class_and_data_property', id]})
        // redirectLink(`/chat/${id}/6`)
      }
    }
  })

  const saveTermDP = (data) => {
    data.deleteItem.map((item) => {
      var delItem = {
        "id": item[0],
        "data_properties_ids": item[1]
      }
      
      deleteItemDP(delItem)
    })
    data.item.map((item) => {
      var temp =  {
        "id": item[2],
        "data_properties": 
          item[1].map((item2) => {
            return {
              "data_property_id": item2[1],
              "data_property_name": item2[0],
              "data_property_type": item2[2]
            }
          })
        }
        
      saveItemFuncDP(temp)
    })

    setMenuActive(1)
  }
  
  const saveTermOP = (data) => {

    data.deleteItem.map((item) => {
      var delItem = {
        "id": item[0],
        "data_properties_ids": item[1]
      }
      console.log(delItem);
      
      deleteItemOP(delItem)
    })
    
    data.item.map((item) => {
      var temp =  {
        "id": item[2],
        "object_properties": 
          item[1].map((item2) => {
            return {
              "object_property_id": item2[1],
              "object_property_name": item2[0],
            }
          })
        }
        
      saveItemFuncOP(temp)
    })

    redirectLink(`/chat/${id}/6`)
  }


  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {
            menu.map((item, index) => {
            return (
              <li key={index} onClick={() => setMenuActive(index)}>
                <button className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-400 hover:border-blue-400 ${index == menuActive ? ' text-blue-primary border-blue-primary' : ''}`} id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{item}</button>
              </li>
            )})
          }
        </ul>
      </div>
      {
        menuActive === 0 ?
        <>
          <div className='font-semibold text-xl mb-2'>{menu[menuActive]}</div>
          {
            termDP.length > 0 ?
            <ValidationDataOnClass data={termDP} name={menu[menuActive]} saveFunction={saveTermDP}/>
            :
            ''
          }
        </>
        :
        ''
      }
      {
        menuActive === 1 ?
        <>
          <div className='font-semibold text-xl mb-2'>{menu[menuActive]}</div>
          <ValidationDataOnClass data={termOP} name={menu[menuActive]} saveFunction={saveTermOP}/>
        </>
        :
        ''
      }
    </div>
  )
}

export default Step5ValidationPage