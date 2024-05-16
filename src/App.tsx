import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './services/utils/NotFoundPage';
import PrivateRoute from './services/utils/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import UserProfilePage from './pages/User/UserProfilePage';
import UserEditProfilePage from './pages/User/UserEditProfilePage';
import { ProfileInterface } from './services/interfaces/Profile';
import { useState } from 'react';
import AdsDetailPage from './pages/Ads/AdsDetailPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import AdsListPage from './pages/Ads/AdsListPage';
import AdsListPageLists from './pages/Ads/AdsListPageLists';
import FooterNav from './components/Footer/FooterNav';
import AdCreatePage from './pages/Ads/AdsCreatePage';
import UserCreatePage from './pages/User/UserCreatePage';

function App() {
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  console.log('setSearchQuery', setSearchQuery)

  function handleSubmitProfile(profile: ProfileInterface):void{
    setProfiles([ ...profiles,  profile]);
  }

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />
      <Routes>
          <Route path="/" />

            <Route element={ <PrivateRoute /> }>
            <Route path='/gestion-utilisateur' element={ <UserCreatePage handleSubmitUser={function (author: User): void {
            throw new Error('Function not implemented.');
          } } /> } />
              <Route path='/mon-compte' element={ <UserProfilePage /> } />
              <Route path='/editer-mon-profil/:idProfile' element={ <UserEditProfilePage handleSubmitProfile={handleSubmitProfile} /> } />
              <Route path='/annonce/:idAd' element={ <AdsDetailPage /> } />
              <Route path='/ajouter-annonce' element={<AdCreatePage />}/>
              <Route path='/calendrier' element={ <CalendarPage /> } />
              <Route path='/ads-list' element={ <AdsListPage searchQuery={searchQuery} /> } />
              <Route path='/ads-list2' element={ <AdsListPageLists searchQuery={searchQuery} /> } />
            </Route>

          <Route path="*" element= { <NotFoundPage />} />
      </Routes>
      <FooterNav />
    </>
  )
}

export default App
