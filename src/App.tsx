/* eslint-disable @typescript-eslint/no-unused-vars */
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
import ConfidentialityPage from './pages/Confidentiality/ConfidentialityPage';
import LegalPage from './pages/Legal/LegalPage';
import ContactPage from './pages/Contact/ContactPage';
import { ContactInterface } from './services/interfaces/Contact';
import CalendarPage from './pages/Calendar/CalendarPage';
import MapPage from './pages/Map/MapPage';
import AdsListPage from './pages/Ads/AdsListPage';
import AdsListPageLists from './pages/Ads/AdsListPageLists';
import FooterNav from './components/Footer/FooterNav';
import AdSubscriptionPage from './pages/Ads/AdSubscriptionPage';
import AdCreatePage from './pages/Ads/AdsCreatePage';
import UserCreatePage from './pages/User/UserCreatePage';
import AdsEditPage from './pages/Ads/AdsEditPage';
import LoginPage from './pages/Auth/LoginPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import { User } from './services/interfaces/User';
import UserManagement from './pages/User/UserManagement';
// import HeaderMenu from './components/Navbar/HeaderMenu';

function App() {
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
  const [contactForms, setContactForms] = useState<ContactInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  console.log('setSearchQuery', setSearchQuery);

  function handleSubmitProfile(profile: ProfileInterface):void{
    setProfiles([ ...profiles,  profile]);
  }

  function handleSubmitContactForm(contactForm: ContactInterface):void{
    setContactForms([ ...contactForms, contactForm]);
  }


  return(
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />
      {/* <HeaderMenu/> */}
      <Routes>
          <Route path="/" />

            <Route element={ <PrivateRoute /> }>
            <Route path='/user-create' element={ <UserCreatePage handleSubmitUser={function (_author: User): void {
            throw new Error('Function not implemented.');
          } } /> } />
             <Route path='/gestion-utilisateurs' element={ <UserManagement handleSubmitUser={function (_author: User): void {
            throw new Error('Function not implemented.');
          } } /> } />
              <Route path='/login' element={ <LoginPage /> } />
              <Route path='/mon-compte' element={ <UserProfilePage /> } />
              <Route path='/editer-mon-profil/:idProfile' element={ <UserEditProfilePage handleSubmitProfile={handleSubmitProfile} /> } />
              <Route path='/annonce/:idAd' element={ <AdsDetailPage /> } />
              <Route path='/mes-annonces/:idUser' element={ <AdSubscriptionPage /> } />
              <Route path='/ajouter-annonce' element={<AdCreatePage />}/>
              <Route path='/edit-annonce/:adId' element={<AdsEditPage />}/>
              <Route path='/calendrier' element={ <CalendarPage searchQuery={searchQuery} /> } />
              <Route path='/carte' element={ <MapPage searchQuery={searchQuery} /> } />
              <Route path="/forgot-password-page" element ={<ForgotPasswordPage/> } />
              <Route path='/confidentialite' element={ <ConfidentialityPage /> } />
              <Route path='/mentions-legales' element={ <LegalPage /> } />
              <Route path='/contact' element={ <ContactPage handleSubmitContactForm={handleSubmitContactForm} /> } />
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

