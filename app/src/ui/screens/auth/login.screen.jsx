import './auth.style.css'
import logoIcon from '../../../assets/images/logo.svg'
import illustration from '../../../assets/images/illustration.svg'

import { useEffect, useState } from 'react'
import { useAuthApi } from '../../../hooks'
import { SCREENS } from '../../../constants'
import { Button, Input } from '../../components'
import { useGlobalUser } from '../../../contexts'
import { Link, useNavigate } from 'react-router-dom'

export const LoginScreen = () => {
  const [globalUser] = useGlobalUser()
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const { login } = useAuthApi()
  const navigate = useNavigate()

  useEffect(() => {
    if (globalUser.user) {
      navigate(SCREENS.HOME)
    }
  }, [globalUser, navigate])

  const handleChange = event => {
    const { name, value } = event.target
    setCredentials({ ...credentials, [name]: value })
  }

  const onLoginSubmit = async event => {
    event.preventDefault()
    await login({ username: credentials.username, password: credentials.password })
  }

  return (
    <>
      <img className='auth__illustration' src={illustration} alt='Ilustração' />

      <div className='auth__container'>
        <img className='auth__img-logo' src={logoIcon} alt='DOA-RS' />

        <form className='auth__form' onSubmit={onLoginSubmit}>
          <Input
            name={'username'}
            value={credentials.username}
            placeholder={'E-mail'}
            onChange={handleChange}
            inForm
          />

          <Input
            name={'password'}
            type={'password'}
            value={credentials.password}
            placeholder={'Senha'}
            onChange={handleChange}
            inForm
          />

          <Button type={'submit'} text={'Entrar'} />

          <span>
            Ainda não tem uma conta?
            <Link to={SCREENS.REGISTER_USER}>
              <button className='auth__btn-register'>Cadastre-se</button>
            </Link>
          </span>
        </form>
      </div>
    </>
  )
}
