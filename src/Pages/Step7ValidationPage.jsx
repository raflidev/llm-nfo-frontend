import React, { useContext, useState } from 'react'
import DataChatContext from '../components/context/DataChatContext'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Slide, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { deleteInstancesClassesByClassID, postSaveInstancesClassesByClassID } from '../services/instancesClasses.services'
import ValidationDataInstancesClass from '../components/organisms/ValidationDataInstancesClass'
import { redirectLink } from '../services/utils'

function Step7ValidationPage() {
  
  const [domain, setDomain] = useState([])
  const {id} = useParams()

  const {insClass} = useContext(DataChatContext)
  
  const queryClient = new QueryClient()

  const {mutate: saveItem, isPending: isPendingSaveItem} = useMutation({mutationFn: postSaveInstancesClassesByClassID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['instances_class', id]})
        // setStep(4)
        // redirectLink(`/chat/${id}/7`)
      }
    }
  })
  const {mutate: deleteItem, isPending: isPendingDeleteItem} = useMutation({mutationFn: deleteInstancesClassesByClassID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['instances_class', id]})
        // setStep(4)
        // redirectLink(`/chat/${id}/7`)
      }
    }
  })



  const saveTerm = (data) => {
    // console.log(data);
    data.deleteItem.map((item) => {
      deleteItem({
        id: item[0],
        instances_ids: item[1]
      })
    })
    const temp = []

    data.item.map((item) => {
      console.log(item);
      const temp = {
        "id": item.class_id,
        "instances": []
      }
      item.instances.map((item2) => {
        temp['instances'].push(item2)
      })
      // console.log(temp);
      saveItem(temp)
    })

    redirectLink(`/chat/${id}/7`)

    
  }


  return (
    <div>
      {
        insClass.length > 0 ?
        <ValidationDataInstancesClass data={insClass} saveFunction={saveTerm}/>
        :
        ''
      }
    </div>
  )
}

export default Step7ValidationPage