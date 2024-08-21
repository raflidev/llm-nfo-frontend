import React, { useContext, useState } from 'react'
import ValidationDataOnClass from '../components/organisms/ValidationDataOnClass'
import DataChatContext from '../components/context/DataChatContext'
import ValidationDataFacet from '../components/organisms/ValidationDataFacet'

function Step6ValidationPage() {
  
  const [menu, setMenu] = useState(['Data Property', 'Object Property'])
  const [menuActive, setMenuActive] = useState(0)

  const {facetOP, facetDP} = useContext(DataChatContext)

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
          <ValidationDataFacet data={facetDP}/>
        </>
        :
        ''
      }
      {
        menuActive === 1 ?
        <>
          <div className='font-semibold text-xl mb-2'>{menu[menuActive]}</div>
          <ValidationDataFacet data={facetOP}/>
        </>
        :
        ''
      }
    </div>
  )
}

export default Step6ValidationPage