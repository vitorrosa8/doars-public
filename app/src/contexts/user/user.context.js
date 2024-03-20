import createGlobalState from 'react-create-global-state'

const USER_LOCAL_STORAGE_KEY = 'doa-rs-local-storage-key'

export const DEFAULT_LOCAL_STORAGE = {
  user: null,
  startSession: null,
}

const localStorageValue = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
const initialUser = localStorageValue ? JSON.parse(localStorageValue) : DEFAULT_LOCAL_STORAGE

const [_useGlobalUser, GlobalUserProvider] = createGlobalState(initialUser)

const useGlobalUser = () => {
  const [globalUser, _setGlobalUser] = _useGlobalUser()

  const setState = value => {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(value))
    _setGlobalUser(value)
  }

  return [globalUser, setState]
}

export { useGlobalUser, GlobalUserProvider }
