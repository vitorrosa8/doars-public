import axios from 'axios'

export const useAxios = (baseURL, headers) => {
  return axios.create({ baseURL, headers })
}
