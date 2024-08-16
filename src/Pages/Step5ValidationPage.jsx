import React, { useEffect, useState } from 'react'
import ValidationData from '../components/organisms/ValidationData'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getdataPropertyByConvID } from '../services/dataProperty.services'
import { getClassesAndDataPropertiesByConvID, getClassesByConvID, putSaveClassesByClassesID } from '../services/classes.services'
import { getObjectPropertiesByConvID } from '../services/objectProperty.services'
import { Slide, toast } from 'react-toastify'
import DataClassesContext from '../components/context/DataClassesContext'
import ValidationDataOnClass from '../components/organisms/ValidationDataOnClass'

function Step5ValidationPage() {
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
  const {data: classAndDataProperty, isPending: isPendingClassAndDataProperty} = useQuery({queryKey: ['class_and_data_property', id], queryFn: () => getClassesAndDataPropertiesByConvID(id)})

  // console.log("class_and_data_property:", classAndDataProperty);
  // console.log("classes:", classes);
  // console.log("data properties:", dataProperty);
  // console.log("object properties:", objectProperty);

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

    if(classAndDataProperty?.data.data.length > 0) {
        const DataProperty = classAndDataProperty?.data.data
        console.log("Data Property:", DataProperty);  
        
        setTermDP(DataProperty.map((item) => [item.class_name, item.data_properties.map((item) => item.data_property_name, item.data_property_id)]))
    }

    if(classAndDataProperty?.data.data.length > 0) {
        const ObjectProperty = classAndDataProperty?.data.data
        setTermOP(ObjectProperty.map((item) => [item.class_name, item.object_properties.map((item) => item.object_property_name, item.object_property_id)]))
    }

  },[classes, classAndDataProperty])

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
          menuActive === 0 && termClasses.length > 0 ?
          <>
            <div className='font-semibold text-xl mb-2'>{menu[menuActive]}</div>
            <ValidationData data={termClasses} setItem={saveClasses} saveFunction={mutateSaveClasses} isLoading={isPendingSaveItem}/>
          </>
          :
          ''
        }

        {
          menuActive === 1 && termDP.length > 0 ?
          <>
            <div className='font-semibold text-xl mb-2'>{menu[menuActive]}</div>
            <ValidationDataOnClass data={termDP}/>
          </>
          :
          ''
        }

        {
          menuActive === 2 && termOP.length > 0 ?
          <>
            <div className='font-semibold text-xl mb-2'>{menu[menuActive]}</div>
            <ValidationDataOnClass data={termOP}/>
          </>
          :
          ''
        }
    </div>
  )
}

export default Step5ValidationPage