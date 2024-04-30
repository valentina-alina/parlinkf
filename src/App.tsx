import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './services/utils/NotFoundPage';
import PrivateRoute from './services/utils/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import NavbarMobile from './components/Navbar/NavbarMobile';
import UserProfilePage from './pages/User/UserProfilePage';
import UserEditProfilePage from './pages/User/UserEditProfilePage';
import { ProfileInterface } from './services/interfaces/Profile';
import { useState } from 'react';
import AdsDetailPage from './pages/Ads/AdsDetailPage';

function App() {
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);

  function handleSubmitProfile(profile: ProfileInterface):void{
    setProfiles([ ...profiles,  profile]);
  }

  return (
    <>
      <Navbar />
      <NavbarMobile />
      <Routes>
          <Route path="/" />

            <Route element={ <PrivateRoute /> }>
              <Route path='/mon-compte' element={ <UserProfilePage /> } />
              <Route path='/editer-mon-profil' element={ <UserEditProfilePage handleSubmitProfile={handleSubmitProfile} /> } />
              <Route path='/annonce/:idAd' element={ <AdsDetailPage /> } />
            </Route>

          <Route path="*" element= { <NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
