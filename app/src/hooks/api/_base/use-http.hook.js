import { useAxios } from './use-axios.hook'
import { SCREENS } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_LOCAL_STORAGE, useGlobalLoader, useGlobalToaster, useGlobalUser } from '../../../contexts'

export const useHttp = (baseURL, headers) => {
  const [, setUser] = useGlobalUser()
  const [, setLoader] = useGlobalLoader()
  const [, setToaster] = useGlobalToaster()
  const instance = useAxios(baseURL, headers)

  const navigate = useNavigate()

  const formatErrors = error => {
    const errorTitle = `${error.message}\n\n`

    if (error.errors?.length) {
      const errorDetails = error.errors.reduce((accum, error) => {
        return `${accum}O campo ${error.field} ${error.message}\n`
      }, errorTitle)

      setToaster({ text: errorDetails, type: 'error' })
    } else {
      setToaster({ text: errorTitle, type: 'error' })
    }
  }

  const handleError = error => {
    if (error?.status === 401) {
      setToaster({ text: 'E-mail ou senha inválidos.', type: 'error' })
      setUser(DEFAULT_LOCAL_STORAGE)
      navigate(SCREENS.LOGIN)
    } else {
      formatErrors(error?.data)
    }
  }

  const get = async url => {
    try {
      setLoader(true)
      const response = await instance.get(url)
      return response.data
    } catch (error) {
      handleError(error.response)
    } finally {
      setLoader(false)
    }
  }

  const post = async (url, data, headers) => {
    try {
      setLoader(true)
      return await instance.post(url, data, headers)
    } catch (error) {
      handleError(error.response)
      throw error
    } finally {
      setLoader(false)
    }
  }

  const put = async (url, data) => {
    try {
      setLoader(true)
      const response = await instance.put(url, data)
      return response.data
    } catch (error) {
      handleError(error.response)
    } finally {
      setLoader(false)
    }
  }

  const del = async url => {
    try {
      setLoader(true)
      const response = await instance.delete(url)
      return response.data
    } catch (error) {
      handleError(error.response)
    } finally {
      setLoader(false)
    }
  }

  return {
    get,
    post,
    put,
    del,
  }
}
