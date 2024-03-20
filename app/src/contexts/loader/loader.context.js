import createGlobalState from 'react-create-global-state'

const [useGlobalLoader, GlobalLoaderProvider] = createGlobalState(false)

export { useGlobalLoader, GlobalLoaderProvider }
