import { useMemo } from 'react'
import { BASE_URL } from '../../../constants'
import { useHttp } from '../_base/use-http.hook'

export const useInstitutionApi = () => {
  const httpInstance = useHttp(`${BASE_URL}/institutions`)


  const getAllInstitutions = async () => {
    return await httpInstance.get('/all')
  }

  const getInstitutionInfo = async ({ userId }) => {
    return await httpInstance.get(`/${userId}`)
  }

  const findInstitution = async ({ text }) => {
    return await httpInstance.get(`/find?text=${text}`)
  }

  return useMemo(
    () => ({
      getAllInstitutions,
      getInstitutionInfo,
      findInstitution
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
