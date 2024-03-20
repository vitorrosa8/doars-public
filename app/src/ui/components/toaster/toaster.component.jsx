import 'react-toastify/dist/ReactToastify.css'

import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useGlobalToaster } from '../../../contexts'

const options = {
  autoClose: 5000,
  draggable: false,
  closeOnClick: false,
  pauseOnHover: true,
  style: { background: 'var(--base-2)' },
  bodyStyle: { whiteSpace: 'pre-line' },
  progressStyle: { background: 'var(--base-4)' },
}

export const Toaster = () => {
  const [toaster, setToaster] = useGlobalToaster()

  useEffect(() => {
    if (toaster.text !== '') {
      toast(toaster.text, { ...options, type: toaster.type })
      setToaster({ text: '', type: 'default' })
    }
  }, [toaster, setToaster])

  return <ToastContainer />
}
