import React from 'react'

function UploadPopUp(props) {
  const { toggle, setToggle, data, setData, setDataName } = props

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(e);
  }

  const handleUpload = (e) => {
    setData(e.target.files[0])
    setDataName(e.target.files[0].name)
    setToggle(!toggle)
  }
  return (

    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <form onSubmit={submitHandler} encType='multipart/form-data' className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Upload File
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-bg hover:text-primary-bg">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" onChange={(e) => handleUpload(e)} type="file" className="sr-only" />
                    </label>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-bg text-base font-medium text-white hover:bg-primary-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-bg sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadPopUp