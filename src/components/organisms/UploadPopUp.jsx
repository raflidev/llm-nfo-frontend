import React, { useState } from 'react'
import InputText from '../atoms/InputText';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { postImportantTempPDF, postImportantTempURL } from '../../services/importantTemp.services';
import ButtonLoading from '../atoms/ButtonLoading';
import { useParams } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { getInstancesClasses } from '../../services/instancesClasses.services';

function UploadPopUp(props) {
  const { toggle, setToggle, data, setData, setDataName } = props
  const {id} = useParams()
  const [domain, setDomain] = useState('')
  const [scope, setScope] = useState('')
  const [isFile, setIsFile] = useState(true)
  const [url, setUrl] = useState('')
  const queryClient = new QueryClient()

  const {mutate: generateInstacesClasses, isPending: isPendingGenerateInstacesClasses} = useMutation({
    mutationFn: getInstancesClasses,
    onSuccess: (response) => {
      console.log(response);
      if(response.status === 200) {
        toast.success(response.data.message, {
          transition: Slide 
        })
        // queryClient.invalidateQueries({queryKey: ['instances_class', id]})
      }
    }
  })

  const {mutate: uploadFileURL, isPending: isPendingUploadFileURL} = useMutation({
    mutationFn: postImportantTempURL,
    onSuccess: (response) => {
      console.log(response);
      if(response.status === 200) {
        toast.success(response.data.message, {
          transition: Slide 
        })
        console.log(id);
        // generateInstacesClasses(id)
        queryClient.invalidateQueries({queryKey: ['important_term', id]})  
        setToggle(!toggle)
        window.location.reload();
      }
    }
  })

  const {mutate: uploadFilePDF, isPending: isPendingUploadFilePDF} = useMutation({
    mutationFn: postImportantTempPDF,
    onSuccess: (response) => {
      console.log(response);
      if(response.status === 200) {
        toast.success(response.data.message, {
          transition: Slide 
        })
        console.log(id);
        // generateInstacesClasses(id)
        queryClient.invalidateQueries({queryKey: ['important_term', id]})
        setToggle(!toggle)
        window.location.reload();
      }
    }
  })

  const submitHandler = (e, type) => {
    e.preventDefault()
    

    if(type === 'url') {
      const data = {
        conversation_id: id,
        url: url
      }
      uploadFileURL(data)
    }
    
    if(type === 'pdf') {
      const upload = {
        file: data,
        conversation_id: id,
      }
      uploadFilePDF(upload)
    }
    
  }

  const handleUpload = (e) => {
    setData(e.target.files[0])
    setDataName(e.target.files[0].name)
  }
  return (

    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <form onSubmit={submitHandler} encType='multipart/form-data' className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Upload File
                </h3>
                <div className="mt-2 space-y-2">
                  {/* <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Domain
                    </label>
                    <InputText type='text' name='name' text={domain} setText={setDomain} disabled={true} />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Scope
                    </label>
                    <InputText type='text' name='name' text={scope} setText={setScope} disabled={true} />
                  </div> */}
                  <div className="space-y-2">
                    <div className='text-primary-bg font-medium text-sm'>You can choose</div>
                    <div className='text-black space-x-2 text-sm'>
                      <button className={`${isFile ? 'underline decoration-blue-400' : ''} decoration-2 underline-offset-2  hover:underline py-1 rounded-md`} onClick={() => {setIsFile(true); setUrl('') }}>Upload File</button>
                      <span>or</span>
                      <button className={`${!isFile ? 'underline decoration-blue-400' : ''} decoration-2 underline-offset-2 hover:underline py-1 rounded-md`} onClick={() => {setIsFile(false); setDataName(''); setData('') }}>URL page</button>
                    </div>
                  </div>
                  {
                    !isFile ? 
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        URL
                      </label>
                      <InputText type='text' name='name' text={url} setText={setUrl} />
                    </div>
                    :
                    <div className="text-sm text-gray-500 flex">
                      <label htmlFor="file-upload" className="w-2/6  border-black py-1 px-2 border-l border-y cursor-pointer bg-white rounded-l-md font-medium text-primary-bg hover:text-primary-bg">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" onChange={(e) => handleUpload(e)} type="file" className="sr-only" />
                      </label>
                      <div className='w-4/6 px-2 py-1 block border rounded-r-md  border-black overflow-hidden duration-200 text-black'>
                      {data.name}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <ButtonLoading type='submit' onClick={(e) => submitHandler(e, url ? 'url' : 'pdf' )} isLoading={isPendingUploadFileURL || isPendingUploadFilePDF}>Submit</ButtonLoading>
            {
              !isPendingUploadFileURL ?
              <button
                type="button"
                onClick={() => setToggle(!toggle)}
                className="w-full block justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-bg text-base font-medium text-white hover:bg-primary-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-bg sm:mr-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
              :
              ''
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadPopUp