import React from 'react'
import LayoutPage from '../components/templates/LayoutPage'

function Visualization() {
  return (
    <LayoutPage>
      <div className='pt-5'>
        <iframe src={`http://owlgred.lumii.lv/online_visualization/`} className='w-full h-[35rem]' title='ontology'></iframe>
      </div>
    </LayoutPage>
  )
}

export default Visualization