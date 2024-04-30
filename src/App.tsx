import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './services/utils/NotFoundPage';
import PrivateRoute from './services/utils/PrivateRoute';
import UserEditProfilePage from './pages/User/UserEditProfilePage';
import { ProfileInterface } from './services/interfaces/Profile';
import { useState } from 'react';

function App() {
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);

  function handleSubmitProfile(profile: ProfileInterface):void{
    setProfiles([ ...profiles,  profile]);
  }

  return (
    <>
      <Routes>
          <Route path="/" />

            <Route element={ <PrivateRoute /> }>
              <Route path='/editer-mon-profil' element={ <UserEditProfilePage handleSubmitProfile={handleSubmitProfile} /> } />
            </Route>

          <Route path="*" element= { <NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
