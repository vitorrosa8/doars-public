import { useCallback, useEffect, useState } from 'react'
import './find-institution.style.css'
import { useInstitutionApi } from '../../../hooks'
import { Input } from '../../components'
import { getImage } from '../../../core'
import { useNavigate } from 'react-router-dom'
import { SCREENS } from '../../../constants'

export const FindInstitutionScreen = () => {
  const [find, setFind] = useState('')
  const [talksList, setTalksList] = useState([])
  const { findInstitution, getAllInstitutions } = useInstitutionApi()

  const navigate = useNavigate()

  const getTalksList = useCallback(async () => setTalksList(await getAllInstitutions()), [getAllInstitutions])

  const handleChange = event => setFind(event.target.value)

  const handleFind = async () => setTalksList(await findInstitution({ text: find }))

  console.log(talksList);

  const handleClearFind = () => {
    setFind('')
  }

  useEffect(() => {
    getTalksList()
  }, [getTalksList])


  const navigateToProfile = institutionId => navigate(`${SCREENS.PROFILE}/${institutionId}`)

  return (
    <div className='find__container'>

        <div className='chat__talks-input'>
          <button
            className={`chat__talks-input-hide ${find !== '' && 'chat__talks-input-show'}`}
            onClick={handleClearFind}
          />
          <Input name={'find'} value={find} placeholder={'Pesquisar...'} onChange={handleChange} />
          <button className='chat__talks-input-btn' onClick={handleFind} />
        </div>

        {talksList.length ? (
          talksList.map(institution => (
            <div className='chat__talks__header'>
              <img src={getImage(institution.image)} alt={institution.name} />
            <div className='chat__talks__infos' onClick={() => navigateToProfile(institution.id)}>
              <h2>
                {institution.name}
              </h2>
              <span>{institution.email}</span>
            </div>
            </div>
          ))
        ) : (
          <p>Busque uma institutição...</p>
        )}
     
    </div>
  )
}
