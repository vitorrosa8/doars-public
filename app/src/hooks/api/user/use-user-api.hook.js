import { useMemo } from 'react'
import { BASE_URL } from '../../../constants'
import { useHttp } from '../_base/use-http.hook'

export const useUserApi = () => {
  const httpInstance = useHttp(`${BASE_URL}/users`)

  const create = async ({
    email,
    password,
    name,
    city,
    uf,
    cep,
    location,
    institution,
    image,
    description,
    contact,
    history,
    donationNeeds
  }) => {
    const response = await httpInstance.post(
      '',
      { email, password, name, city, uf, cep, location, institution, image, description, contact, history, donationNeeds },
      {}
    )

    return response?.data
  }

  const details = async () => {
    return await httpInstance.get()
  }

  const edit = async ({ email, name, city, uf, cep, location, institution, image, description, contact, history, donationNeeds }) => {
    return await httpInstance.put('', { email, name, city, uf, cep, location, institution, image, description, contact, history, donationNeeds })
  }

  const findInstitutions = async ({ text }) => {
    return await httpInstance.get(`/find?text=${text}`)
  }


  return useMemo(
    () => ({
      create,
      details,
      edit,
      findInstitutions
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
