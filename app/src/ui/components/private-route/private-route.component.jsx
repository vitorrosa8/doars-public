import { Navigate } from 'react-router-dom'
import { MAX_SESSION_TIME, SCREENS } from '../../../constants'
import { DEFAULT_LOCAL_STORAGE, useGlobalToaster, useGlobalUser } from '../../../contexts'

export const PrivateRoute = ({ children }) => {
  const [user, setUser] = useGlobalUser()
  const [, setToaster] = useGlobalToaster()

  const isValidSession = () => {
    return user.startSession + MAX_SESSION_TIME > new Date().getTime()
  }

  if (user.startSession) {
    if (isValidSession()) {
      return <>{children}</>
    } else {
      setToaster({ text: 'Sua sessão expirou, faça login novamente.', type: 'warning' })
      setUser(DEFAULT_LOCAL_STORAGE)
      return <Navigate to={SCREENS.LOGIN} />
    }
  } else {
    return <Navigate to={SCREENS.LOGIN} />
  }
}
