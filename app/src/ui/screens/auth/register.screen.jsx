import './auth.style.css'
import logoIcon from '../../../assets/images/logo.svg'
import uploadIcon from '../../../assets/images/upload.svg'
import illustration from '../../../assets/images/illustration.svg'

import { useState } from 'react'
import { useUserApi } from '../../../hooks'
import { Button, Input } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalToaster } from '../../../contexts'
import { REGISTER_ACCOUNT, SCREENS } from '../../../constants'
import { formatInputValues, getImage, uploadImage, validateInputValues } from '../../../core'

export const RegisterScreen = () => {
  const [image, setImage] = useState(null)
  const [, setToaster] = useGlobalToaster()
  const [values, setValues] = useState(REGISTER_ACCOUNT)

  const { create } = useUserApi()
  const navigate = useNavigate()

  const handleSubmit = async submitEvent => {
    submitEvent.preventDefault()

    const errorList = validateInputValues(values, values.confirmedPassword)

    if (errorList.length) {
      setToaster({ text: errorList, type: 'error' })
    } else {
      try {
        await create({
          email: values.email,
          password: values.password,
          name: values.name,
          city: values.city,
          uf: values.uf,
          cep: values.cep,
          location: values.location,
          institution: values.institution,
          image,
        })
        navigate(SCREENS.LOGIN)
      } catch (error) {
        setToaster({ text: 'Ocorreu um erro ao realizar seu cadastro.', type: 'error' })
      }
    }
  }

  const handleChange = changeEvent => {
    if (changeEvent.target.name === 'image') {
      uploadImage(changeEvent, setImage)
    } else {
      const inputValues = formatInputValues(changeEvent, values)
      setValues(inputValues)
    }
  }

  const handleGoInstitution = () => {
    const errorList = validateInputValues(values, values.confirmedPassword)

    if (errorList.length) {
      setToaster({ text: errorList, type: 'error' })
    } else {
      navigate(SCREENS.REGISTER_INSTITUTION, { state: { ...values, image } })
    }
  }

  return (
    <>
      <img className='auth__illustration' src={illustration} alt='Ilustração' />

      <div className='auth__container'>
        <img className='auth__img-logo' src={logoIcon} alt='DOA-RS' />

        <form className='auth__form' onSubmit={handleSubmit}>
          <Input
            name={'name'}
            value={values.name}
            placeholder={'Nome'}
            onChange={handleChange}
            inForm
          />

          <Input name={'email'} value={values.email} placeholder={'E-mail'} onChange={handleChange} inForm />

          <Input
            name={'password'}
            type={'password'}
            value={values.password}
            placeholder={'Senha (8 a 20 caracteres)'}
            onChange={handleChange}
            inForm
          />

          <Input
            name={'confirmedPassword'}
            type={'password'}
            value={values.confirmedPassword}
            placeholder={'Confirmação da senha'}
            onChange={handleChange}
            inForm
          />

          <Input name={'city'} value={values.city} placeholder={'Cidade'} onChange={handleChange} inForm />

          <Input name={'uf'} value={values.uf} placeholder={'UF'} onChange={handleChange} inForm />

          <Input name={'cep'} value={values.cep} placeholder={'CEP'} onChange={handleChange} inForm />

          <Input name={'location'} value={values.location} placeholder={'Rua X, 123'} onChange={handleChange} inForm />

          <label className='input__label input__in-form'>
            <span>Cadastrar-se como Instituição</span>
            <input
              className='input_checkbox'
              type='checkbox'
              name={'institution'}
              onChange={handleChange}
              checked={values.institution}
            />
          </label>

          <label className='input__label-file'>
            <img className='input__img-loaded' src={getImage(image)} alt='Sua foto' />
            <img className='input__img-icon' src={uploadIcon} alt='Carregar imagem' />
            <input type='file' name='image' className='input__file' onChange={handleChange} />
          </label>

          {values.institution ? (
            <Button text={'Avançar'} onClick={handleGoInstitution} />
          ) : (
            <Button type={'submit'} text={'Criar conta'} />
          )}

          <span>
            Já tem uma conta?
            <Link to={SCREENS.LOGIN}>
              <button className='auth__btn-register'>Faça login</button>
            </Link>
          </span>
        </form>
      </div>
    </>
  )
}
