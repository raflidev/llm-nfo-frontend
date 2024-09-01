import React, { useContext, useState } from 'react'
import ValidationDataOnClass from '../components/organisms/ValidationDataOnClass'
import DataChatContext from '../components/context/DataChatContext'
import ValidationDataFacet from '../components/organisms/ValidationDataFacet'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { postSavedataPropertyByConvID } from '../services/dataProperty.services'
import { Slide, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import ValidationDataFacetDomain from '../components/organisms/ValidationDataFacetDomain'
import { deleteDomainByID, deleteRangeByID, postSaveObjectPropertiesByConvID } from '../services/objectProperty.services'
import { redirectLink } from '../services/utils'

function Step6ValidationPage() {
  
  const [menu, setMenu] = useState(['Data Property', 'Object Property'])
  const [menuActive, setMenuActive] = useState(0)
  const [domain, setDomain] = useState([])
  const {id} = useParams()

  const {facetOP, facetDP} = useContext(DataChatContext)
  const queryClient = new QueryClient()

  const {mutate: saveItemFuncDP, isPending: isPendingSaveItemDP} = useMutation({mutationFn: postSavedataPropertyByConvID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['class_and_data_property', id]})
        // setStep(4)
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
        
        redirectLink(`/chat/${id}/7`)
      }
    }
  })

  const {mutate: deleteRanges, isPending: isPendingDeleteRanges} = useMutation({mutationFn: deleteRangeByID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['class_and_data_property', id]})
        
      }
    }
  })

  const {mutate: deleteDomains, isPending: isPendingDeleteDomains} = useMutation({mutationFn: deleteDomainByID,
    onSuccess: (response) => {
      if(response.status === 200){
        toast.success(response.data.message, {
          transition: Slide
        })
        queryClient.invalidateQueries({queryKey: ['class_and_data_property', id]})
        
      }
    }
  })


  const saveTermDP = (data) => {
    data.item.map((item) => {
      var temp =  {
        "id": item[2],
        "data_properties": 
          item[1].map((item2) => {
            return {
              "data_property_id": item2[2],
              "data_property_name": item2[0],
              "data_property_type": item2[1]
            }
          })
        }
        
      saveItemFuncDP(temp)
      setMenuActive(1)
      })
  }

  const saveDomain = (data) => {
    data.rangeDelete.map((item) => {
      var delItem = {
        "id": item[0],
        "range_ids": item[1]
      }
      console.log(delItem);
      
      deleteRanges(delItem)
    })

    data.domainDelete.map((item) => {
      var delItem = {
        "id": item[0],
        "domain_ids": item[1]
      }
      console.log(delItem);
      
      deleteDomains(delItem)
    })
    var hasildomain = []
    data.item.map((item) => {
      var temp = {
        "id": item[2],
        "object_properties": 
          item[1].map((item2) => {
            return {
              "object_property_id": item2[2],
              "object_property_name": item2[0],
              "domains": item2[1]
            }
          })
        }
        hasildomain.push(temp)
        // setMenuActive(2)
        saveItemFuncOP(temp)
    })
    // console.log(hasildomain);

    
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
            facetDP.length > 0 ?
            <ValidationDataFacet data={facetDP} saveFunction={saveTermDP}/>
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
          <ValidationDataFacetDomain data={facetOP} saveFunction={saveDomain}/>
        </>
        :
        ''
      }
    </div>
  )
}

export default Step6ValidationPage