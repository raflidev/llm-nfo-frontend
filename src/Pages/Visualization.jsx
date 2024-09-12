import React from 'react'
import LayoutPage from '../components/templates/LayoutPage'

function Visualization() {
  return (
    <LayoutPage visualization={true}>
      <div className='pt-5'>
        <iframe src={`https://owlgred.lumii.lv/online_visualization/`} className='w-full h-[45rem]' title='ontology'></iframe>
      </div>
    </LayoutPage>
  )
}

export default Visualization