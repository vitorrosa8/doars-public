import './loader.style.css'

import { useGlobalLoader } from '../../../contexts'

export const Loader = () => {
  const [loader] = useGlobalLoader()

  return (
    <>
      {!!loader && (
        <div className='loader__container'>
          <div className='loader__content'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  )
}
