import './app.css'
import './assets/styles/variables.css'

import { SCREENS } from './constants'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Loader, PrivateRoute, Sidebar, Toaster } from './ui/components'
import {
  LoginScreen,
  RegisterScreen,
  RegisterInstitutionScreen,
  HomeScreen,
  UserScreen,
  NearbyInstitutionScreen,
  InstitutionScreen,
  FindInstitutionScreen,
  PostScreen

} from './ui/screens'

const App = () => {

  return (
    <div className='container'>
      <Loader />
      <Toaster />
      <Sidebar />

      <div className='container-screen'>
        <Routes>
          <Route path={SCREENS.LOGIN} element={<LoginScreen />} />
          <Route path={SCREENS.REGISTER_USER} element={<RegisterScreen />} />
          <Route path={SCREENS.REGISTER_INSTITUTION} element={<RegisterInstitutionScreen />} />

          <Route
            path={SCREENS.HOME}
            element={
              <PrivateRoute>
                <HomeScreen />
              </PrivateRoute>
            }
          />

        <Route
          path={SCREENS.USER}
          element={
            <PrivateRoute>
              <UserScreen />
            </PrivateRoute>
          }
        />

        <Route
          path={SCREENS.NEARBY_INSTITUTIONS}
          element={
            <PrivateRoute>
              <NearbyInstitutionScreen />
            </PrivateRoute>
          }
        />

        <Route
          path={SCREENS.FIND}
          element={
            <PrivateRoute>
              <FindInstitutionScreen />
            </PrivateRoute>
          }
        />

        <Route
          path={`${SCREENS.PROFILE}/:userId`}
          element={
            <PrivateRoute>
              <InstitutionScreen />
            </PrivateRoute>
          }
        />

        <Route
          path={`${SCREENS.POST}/:postId`}
          element={
              <PostScreen/>
          }
        />
    
          <Route path='*' element={<Navigate to={SCREENS.LOGIN} />} />
        </Routes>
        </div>
    </div>
  )
}

export default App;
