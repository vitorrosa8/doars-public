import { useMemo } from 'react'
import { BASE_URL } from '../../../constants'
import { useHttp } from '../_base/use-http.hook'
import { useGlobalUser } from '../../../contexts'

export const useAuthApi = () => {
  const [user, setUser] = useGlobalUser()

  const httpInstance = useHttp(BASE_URL)

  const login = async ({ username, password }) => {
    const response = await httpInstance.post('/login', null, {
      auth: { username, password },
    })

    if (response) {
      setUser({
        ...user,
        startSession: new Date().getTime(),
        user: { id: response.data.userId },
      })
    }
  }

  return useMemo(
    () => ({
      login,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
