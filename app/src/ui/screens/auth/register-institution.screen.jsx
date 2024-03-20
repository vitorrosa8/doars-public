import './auth.style.css'
import logoIcon from '../../../assets/images/logo.svg'
import illustration from '../../../assets/images/illustration.svg'

import { useState } from 'react'
import { useUserApi } from '../../../hooks'
import { Button} from '../../components'
import { useGlobalToaster } from '../../../contexts'
import { REGISTER_INSTITUTION, SCREENS } from '../../../constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { formatInputValues, validateInputValues } from '../../../core'
import { DONATION_TYPES } from '../../../constants'

export const RegisterInstitutionScreen = () => {
  const { create } = useUserApi()
  const [, setToaster] = useGlobalToaster()
  const [values, setValues] = useState(REGISTER_INSTITUTION)

  const navigate = useNavigate()
  const { state } = useLocation()

  const onRegisterSubmit = async submitEvent => {
    submitEvent.preventDefault()

    const errorList = validateInputValues(values)

    if (errorList.length) {
      setToaster({ text: errorList, type: 'error' })
    } else {
      try {
        await create({
          email: state.email,
          password: state.password,
          name: state.name,
          city: state.city,
          uf: state.uf,
          cep: state.cep,
          location: state.location,
          institution: state.institution,
          image: state.image,
          description: values.description,
          contact: values.contact,
          history: values.history,
          donationNeeds: values.donationNeeds,
        })
        navigate(SCREENS.LOGIN)
      } catch (error) {
        setToaster({ text: 'Ocorreu um erro ao realizar seu cadastro.', type: 'error' })
      }
    }
  }

  const handleChange = changeEvent => {
    const inputValues = formatInputValues(changeEvent, values);
    const { name, value, checked } = changeEvent.target;

    if (name === 'donationNeeds') {
      if (checked) {

        setValues((prevValues) => ({
          ...prevValues,
          donationNeeds: [...prevValues.donationNeeds, value],
        }));
      } else {

        setValues((prevValues) => ({
          ...prevValues,
          donationNeeds: prevValues.donationNeeds.filter((item) => item !== value),
        }));
      }
    } else {
      setValues(inputValues);
    }
  }

  return (
    <>
      <img className='auth__illustration' src={illustration} alt='Ilustração' />

      <div className='auth__container'>
        <img className='auth__img-logo' src={logoIcon} alt='DOA-RS' />

        <form className='auth__form' onSubmit={onRegisterSubmit}>
          <textarea
            name='description'
            onChange={handleChange}
            value={values.description}
            className='input__label input__in-form'
            placeholder={'Escreva um pouco sobre sua instituição...'}
          />

          <textarea
            name='contact'
            onChange={handleChange}
            value={values.contact}
            className='input__label input__in-form'
            placeholder={'Informações de contato da instituição'}
          />

          <textarea
            name='history'
            onChange={handleChange}
            value={values.history}
            className='input__label input__in-form'
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
                  checked={values.donationNeeds.includes(option.value)}
                  onChange={handleChange}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>

          <Button type={'submit'} text={'CADASTRAR'} />

          <Link to={SCREENS.LOGIN}>
            <button className='auth__btn-register'>Fazer login</button>
          </Link>
        </form>
      </div>
    </>
  )
}
