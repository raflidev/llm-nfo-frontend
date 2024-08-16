import React, { useEffect, useState } from 'react'
import ValidationData from '../components/organisms/ValidationData'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getClassesByConvID, putSaveClassesByClassesID } from '../services/classes.services'
import { Slide, toast } from 'react-toastify'

function Step4ValidationPage() {
  const {id} = useParams()
  const [termDP, setTermDP] = useState([])
  const [termOP, setTermOP] = useState([])
  const [termClasses, setTermClasses] = useState([])
  const [itemClasses, setItemClasses] = useState([])
  const [itemDP, setItemDP] = useState([])
  const [menu, setMenu] = useState(['Validate Classes', 'Data Property', 'Object Property'])
  const [menuActive, setMenuActive] = useState(0)
  const {data: classes, isPending: isPendingClasses} = useQuery({queryKey: ['classes', id], queryFn: () => getClassesByConvID(id)})
  const queryClient = new QueryClient()

  const {mutate: mutateSaveClasses, isPending: isPendingSaveItem} = useMutation({mutationFn: putSaveClassesByClassesID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['classes', id]})
        setMenuActive(menuActive+1)
        // setStep(4)
      }
    }
  })

  const saveClasses = (item) => {
    item.item.map((item) => {
      const data = {
        "id": item[1],
        "class": item[0]
      }
      mutateSaveClasses(data)
    })
    
  }
  useEffect(() => {
    if(classes?.data.data.length > 0) {
        const Class = classes?.data.data
        // setTermClasses({'name': Class.map((item) => item.name), 'class_id': Class.map((item) => item.class_id)})
        setTermClasses( Class.map((item) => [item.name, item.class_id]))
    }

   
  },[classes])

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