import React, { useContext, useState } from 'react'
import InputBottom from '../components/organisms/InputBottom'
import { createExistingOntology } from '../services/conversation.services';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { Slide, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import DataChatContext from '../components/context/DataChatContext';

function Step2Page() {
  const {existingOntology, setExistingOntology} = useContext(DataChatContext)
  const [text, setText] = useState('')
  const {id} = useParams()
  console.log(existingOntology);
  
  const queryClient = new QueryClient()

  const {mutate: generateExistingOntology, isPending: isPendingGenerateExistingOntology} = useMutation({
    mutationFn: createExistingOntology,
    onSuccess: (response) => {
      console.log(response);
      if(response.status === 200) {
        toast.success(response.data.message, {
          transition: Slide 
        })
        setExistingOntology(response.data)
        queryClient.invalidateQueries({queryKey: ['existing_ontology']})
        setText('')
      }
    }
  })

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    
    const data = {
      conversation_id: id,
      prompt: text,
    };
    console.log(data);
    generateExistingOntology(data)
  }


  return (
    <div>
      <div className="space-y-2">
        {
          Object.keys(existingOntology).length > 0 && (
            <div>
              <hr className='pb-2' />
              <p>
                The ontology might be inaccurate and should be reviewed. This is only provided as a reference example of existing ontologies.

                Additionally, this data is temporary and will be lost if the page is refreshed.
              </p>
            </div>
          )
        }
        

        <div className="space-y-6 pt-5">
          {
            Object.keys(existingOntology).length > 0 && (
              <div  className='space-y-3'>
                <div className='space-y-1'>
                <h1 className='font-semibold text-xl'>{existingOntology.class_name}</h1>
                  <div className="grid grid-cols-1">
                    {
                      existingOntology.link.map((link, index) => (
                        <a href={link} key={index} className='text-sm text-blue-400 underline hover:cursor-pointer hover:text-white duration-150'>{link}</a>
                      ))
                    }
                  </div>
                </div>
                <div className='text-sm'>
                  <span className='font-semibold'>Domain: </span>
                  {existingOntology.domain} |
                  <span className='font-semibold'> Scope: </span>
                  {existingOntology.scope} 
                </div>
                <div className="">
                  {existingOntology.description}
                </div>
                
                <div className="flex gap-2 flex-wrap">
                <div className='text-sm font-semibold'>Class Labels:</div>
                  {
                    existingOntology.class_labels.map((label, index) => (
                      <p className='py-1 bg-secondary-bg rounded-full px-5 text-xs' key={index}>{label}</p>
                    ))
                  }
                </div>
                <div>
                <div className='text-sm font-semibold'>Data Properties:</div>
                <div className="pl-3 space-y-1 pt-2">
                  {
                    existingOntology.data_properties.map((dp, index) => (
                      <div key={index} className='space-y-3'>
                        <div className=''>{dp.data_property_name}: {dp.data_property_type}</div>
                      </div>
                    ))
                  }
                </div>
                </div>
                <div>
                <div className='text-sm font-semibold'>Object Properties:</div>
                <div className="space-y-2">
                  {
                    existingOntology.object_properties.map((op, index) => (
                      <div key={index} className='space-y-2'>
                        <div className=''> • {op.object_property_name}</div>
                        <div className="pl-3 space-y-1 pt-1">
                          {
                            op.domains.map((domain, index) => {
                              return (
                                <div key={index} className='space-y-2'>
                                  <div className='text-sm font-semibold'>Domain: </div>
                                  <span>{domain.domain_name}</span>
                                  {
                                    domain.ranges.map((range, index) => {
                                      return <div key={index} className='space-y-2'>
                                        <div className='text-sm font-semibold'>Range:</div>
                                        <span>{range.range_name}</span>
                                      </div>
                                    })
                                  }
                                </div>
                              )
                            } 
                            )
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <InputBottom setText={setText} text={text} handleChange={handleChange} submitHandler={submitHandler} loading={isPendingGenerateExistingOntology} />
    </div>
  )
}

export default Step2Page