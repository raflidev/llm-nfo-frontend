import React, { useEffect, useState } from 'react'
import ValidationData from '../components/organisms/ValidationData'
import { useQuery } from '@tanstack/react-query'
import { getImportantTempByConvID } from '../services/importantTemp.services'
import { useParams } from 'react-router-dom'
import { getdataPropertyByConvID } from '../services/dataProperty.services'
import { getClassesByConvID } from '../services/classes.services'
import { getObjectPropertiesByConvID } from '../services/objectProperty.services'

function Step5ValidationPage() {
  const {id} = useParams()
  const [termDP, setTermDP] = useState([])
  const [termOP, setTermOP] = useState([])
  const [termClasses, setTermClasses] = useState([])
  const [menu, setMenu] = useState(['Validate Classes', 'Data Property', 'Object Property'])
  const [menuActive, setMenuActive] = useState(0)
  const {data: classes, isPending: isPendingClasses} = useQuery({queryKey: ['classes', id], queryFn: () => getClassesByConvID(id)})
  const {data: dataProperty, isPending: isPendingDataProperty} = useQuery({queryKey: ['data_property', id], queryFn: () => getdataPropertyByConvID("16d105cd-9e28-4422-b5f8-77830b6237d7")})
  const {data: objectProperty, isPending: isPendingObjectProperty} = useQuery({queryKey: ['object_property', id], queryFn: () => getObjectPropertiesByConvID("16d105cd-9e28-4422-b5f8-77830b6237d7")})
  console.log("classes:", classes);
  console.log("data properties:", dataProperty);
  console.log("object properties:", objectProperty);
  useEffect(() => {
    if(classes?.data.data.length > 0) {
        const Class = classes?.data.data
        setTermClasses(Class.map((item) => item.name))
        
    }
  },[classes, dataProperty, objectProperty])

  return (
    <div>

    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
            {
                menu.map((item, index) => {
                    return (
                        <li onClick={() => setMenuActive(index)}>
                            <button class={`inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-400 hover:border-blue-400 ${index == menuActive ? ' text-blue-primary border-blue-primary' : ''}`} id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{item}</button>
                        </li>
                    )})
            }
        </ul>
    </div>

        {
          menuActive === 0 && termClasses.length > 0 ?
          <>
            <div className='font-semibold text-xl mb-2'>{menu[menuActive]}</div>
            <ValidationData data={termClasses}/>
          </>
          :
          ''
        }

        {
          menuActive === 0 && termDP.length > 0 ?
          <>
            <div className='font-semibold text-xl mb-2'>{menu[menuActive]}</div>
            <ValidationData data={termDP}/>
          </>
          :
          ''
        }

        {
          menuActive === 0 && termOP.length > 0 ?
          <>
            <div className='font-semibold text-xl mb-2'>{menu[menuActive]}</div>
            <ValidationData data={termOP}/>
          </>
          :
          ''
        }
    </div>
  )
}

export default Step5ValidationPage