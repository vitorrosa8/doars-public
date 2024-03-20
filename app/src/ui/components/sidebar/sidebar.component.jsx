import './sidebar.style.css'
import icon from '../../../assets/images/icon.svg'
import linkIcon from '../../../assets/images/add.svg'
import lIcon from '../../../assets/images/lupa.svg'
import tasksIcon from '../../../assets/images/tasks.svg'

import { SCREENS } from '../../../constants'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalUser } from '../../../contexts'
import { DEFAULT_LOCAL_STORAGE } from '../../../contexts'
import { getImage } from '../../../core'

const SidebarItem = ({ icon, text, linkTo }) => {
  return (
    <li className='sidebar__item'>
      <Link to={linkTo}>
        <button className='sidebar__btn'>
          <img src={icon} alt={text} />
          <p>{text}</p>
        </button>
      </Link>
    </li>
  )
}

export const Sidebar = () => {
  const navigate = useNavigate()
  const [globalUser, setGlobalUser] = useGlobalUser()

  const handleHome = () => {
    navigate(SCREENS.HOME)
  }

  const handleProfile = () => {
    navigate(SCREENS.USER)
  }

  const handleLogout = () => {
    setGlobalUser(DEFAULT_LOCAL_STORAGE)

    navigate(SCREENS.LOGIN)
  }

  return (
    <>
      {!!globalUser.user && (
        <nav className='sidebar'>
          <div>
            <header className='sidebar__header' onClick={handleHome}>
              <img src={icon} alt='DOA-RS' />
              <h1>DOA-RS</h1>
            </header>

            <ul className='sidebar__list'>
              

              {globalUser.user?.institution && (
                <>
                  <SidebarItem icon={tasksIcon} text={'Home'} linkTo={SCREENS.HOME} />
                </>
              )}

              {!globalUser.user?.institution && (
                <>
                  <SidebarItem icon={tasksIcon} text={'Home'} linkTo={SCREENS.HOME} />
                  <SidebarItem icon={linkIcon} text={'Instituições próximas'} linkTo={SCREENS.NEARBY_INSTITUTIONS} />
                  <SidebarItem icon={lIcon} text={'Buscar Instituições'} linkTo={SCREENS.FIND} />
                </>
              )}
            </ul>
          </div>

          <div className='dropdown'>
            <footer className='sidebar__footer'>
              <img
                className='sidebar__img-user'
                src={getImage(globalUser.user.image)}
                alt={globalUser.user.name}
              />

              <p className='sidebar__text-user'>{globalUser.user.name}</p>

              <div className='dropdown__content dropdown__content-user'>
                <button className='dropdown__btn' onClick={handleProfile}>
                  Meu perfil
                </button>
                <button className='dropdown__btn' onClick={handleLogout}>
                  Sair
                </button>
              </div>
            </footer>
          </div>
        </nav>
      )}
    </>
  )
}

