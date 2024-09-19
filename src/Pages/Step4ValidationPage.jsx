import React, { useContext, useEffect, useState } from 'react'
import ValidationData from '../components/organisms/ValidationData'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { postSaveClassesByClassesID } from '../services/classes.services'
import { Slide, toast } from 'react-toastify'
import DataChatContext from '../components/context/DataChatContext'
import { redirectLink } from '../services/utils'

function Step4ValidationPage() {
  const {id} = useParams()
  const {setStep, termClasses, setTermClasses} = useContext(DataChatContext)
  const queryClient = new QueryClient()
  const {mutate: mutateSaveClasses, isPending: isPendingSaveItem} = useMutation({mutationFn: postSaveClassesByClassesID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['classes', id]})
        queryClient.invalidateQueries({queryKey: ['class_and_data_property', id]})
        // setStep(5)
        setInterval(() => {
          redirectLink(`/chat/${id}/5`)
        }, 1000)
      }
    },
    onError: (error) => {
      console.log(error);
      
    }
  })

  const saveClasses = (item) => {
    const data = {
      "id": id,
      "classes": []
    }
    item.item.map((item) => {
      data.classes.push({
        "class_id": item[1],
        "class_name": item[0]
      })
    })
    // console.log(data);
    mutateSaveClasses(data)
    // setStep(5)
    
  }

  return (
    <div>



        {
          termClasses.length > 0 ?
          <>
            <ValidationData data={termClasses} setItem={saveClasses} saveFunction={mutateSaveClasses} isLoading={isPendingSaveItem}/>
          </>
          :
          ''
        }

    </div>
  )
}

export default Step4ValidationPage