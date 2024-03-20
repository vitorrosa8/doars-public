import { useCallback, useEffect, useState } from 'react'
import './user.style.css'
import { useGlobalUser } from '../../../contexts'
import { useUserApi } from '../../../hooks'
import editIcon from '../../../assets/images/edit.svg'
import uploadIcon from '../../../assets/images/upload.svg'
import { formatInputValues, getImage, uploadImage } from '../../../core'
import { Button, Input } from '../../components'
import { DONATION_TYPES } from '../../../constants'

export const UserScreen = () => {
  const [image, setImage] = useState(null)
  const [editForm, setEditForm] = useState(false)
  const [globalUser, setGlobalUser] = useGlobalUser()

  const [inputValues, setInputValues] = useState({
    name: globalUser.user.name,
    email: globalUser.user.email,
    image: globalUser.user.image,
    city: globalUser.user.city,
    uf: globalUser.user.uf,
    cep: globalUser.user.cep,
    location: globalUser.user.location,
    description: globalUser.user.description,
    contact: globalUser.user.contact,
    history: globalUser.user.history,
    donationNeeds: globalUser.user.donationNeeds
  })

  const { details, edit } = useUserApi()
  
  const getGlobalUser = useCallback(async () => {
    const user = await details()
    setGlobalUser({ ...globalUser, user })
  }, [details])

  useEffect(() => {
    getGlobalUser()
  }, [getGlobalUser])

  useEffect(() => setInputValues({ ...inputValues, image }), [image])

  const handleChange = (changeEvent) => {
    const { name, value, checked } = changeEvent.target;
  
    if (name === 'donationNeeds') {
      if (checked) {
        setInputValues((prevValues) => ({
          ...prevValues,
          donationNeeds: [...prevValues.donationNeeds, value],
        }));
      } else {
        setInputValues((prevValues) => ({
          ...prevValues,
          donationNeeds: prevValues.donationNeeds.filter((item) => item !== value),
        }));
      }
    } else if (name === 'image') {
      uploadImage(changeEvent, setImage);
    } else {
      const values = formatInputValues(changeEvent, inputValues);
      setInputValues(values);
    }
  }

  const onEditSubmit = async event => {
    event.preventDefault()
    await edit(inputValues)
    setEditForm(!editForm)
    getGlobalUser()
  }

  const formattedDonationNeeds = globalUser.user.donationNeeds.map((need) => {
    const donationType = DONATION_TYPES.find((type) => type.value === need);
    return donationType ? donationType.label : '';
  });

  return (
<div className='profile__container'>
      {!editForm ? (
        <>
          <div className='profile__header'>
            <img src={getImage(globalUser.user.image)} alt={globalUser.user.name} />
            <div className='profile__infos'>
              <h2>
                {globalUser.user.name}
              </h2>
              <span>{globalUser.user.email}</span>
            </div>
            <button classname='profile__header_btn' onClick={() => setEditForm(!editForm)} style={{ backgroundImage: `url(${editIcon})` }} />
          </div>
          <div className='profile__body'>

          <span className='profile__body-item'>CIDADE: {globalUser.user.city} - {globalUser.user.uf}</span>

          <span className='profile__body-item'>CEP: {globalUser.user.cep}</span>

          <span className='profile__body-item'>ENDEREÇO: {globalUser.user.location}</span>

          {globalUser.user.institution && (
                <>
                  <span className='profile__body-item'>DESCRIÇÃO: {globalUser.user.description}</span>
                  <span className='profile__body-item'>HISTÓRIA: {globalUser.user.history}</span>
                  <span className='profile__body-item'>INFORMAÇÕES DE CONTATO: {globalUser.user.contact}</span>
                  <span className='profile__body-item'>DOAÇÕES ACEITAS: {formattedDonationNeeds.join(', ')}</span>
                </>
              )}
          </div>
        </>
      ) : (
        <form onSubmit={onEditSubmit} className='profile__edit-form'>
          <Input
            name={'name'}
            value={inputValues.name}
            placeholder={'Nome'}
            onChange={handleChange}
            inForm
          />

          <Input name={'email'} value={inputValues.email} placeholder={'E-mail'} onChange={handleChange} inForm />

          <Input name={'city'} value={inputValues.city} placeholder={'Cidade'} onChange={handleChange} inForm />

          <Input name={'uf'} value={inputValues.uf} placeholder={'UF'} onChange={handleChange} inForm />

          <Input name={'cep'} value={inputValues.cep} placeholder={'CEP'} onChange={handleChange} inForm />

          <Input name={'location'} value={inputValues.location} placeholder={'Rua X, 123'} onChange={handleChange} inForm />

          {globalUser.user.institution && (
            <>
            <textarea
              name='description'
              onChange={handleChange}
              value={inputValues.description}
              className='input__label-textarea input__in-form-textarea'
              placeholder={'Escreva um pouco sobre sua instituição...'}
            />

            <textarea
              name='contact'
              onChange={handleChange}
              value={inputValues.contact}
              className='input__label-textarea input__in-form-textarea'
              placeholder={'Informações de contato da instituição'}
            />

            <textarea
              name='history'
              onChange={handleChange}
              value={inputValues.history}
              className='input__label-textarea input__in-form-textarea'
              placeholder={'Escreva um pouco sobre a história instituição...'}
            />

            <div className='input__label__checkbox input__in-form_checkbox'>
              <span>Tipos de doações aceitas:</span>
              {DONATION_TYPES.map((option) => (
                <div className='checkbox__container'>
                  <input
                    name='donationNeeds'
                    type='checkbox'
                    id={option.value}
                    value={option.value}
                    key={option.value}
                    checked={inputValues.donationNeeds.includes(option.value)}
                    onChange={handleChange}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
            </>
          )}

          <label className='input__label-file'>
            <img className='input__img-loaded' src={getImage(inputValues.image)} alt='Sua foto' />
            <img className='input__img-icon' src={uploadIcon} alt='Carregar imagem' />
            <input type='file' name='image' className='input__file' onChange={handleChange} />
          </label>

          <Button type={'submit'} text={'Editar'} />
        </form>

      )}
    </div>
  )
}
