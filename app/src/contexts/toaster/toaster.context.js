import createGlobalState from 'react-create-global-state'

const [useGlobalToaster, GlobalToasterProvider] = createGlobalState('')

export { useGlobalToaster, GlobalToasterProvider }
