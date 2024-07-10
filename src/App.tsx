/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './services/utils/NotFoundPage';
import PrivateRoute from './services/utils/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import UserProfilePage from './pages/User/UserProfilePage';
import UserEditProfilePage from './pages/User/UserEditProfilePage';
import AdsDetailPage from './pages/Ads/AdsDetailPage';
import ConfidentialityPage from './pages/Confidentiality/ConfidentialityPage';
import LegalPage from './pages/Legal/LegalPage';
import ContactPage from './pages/Contact/ContactPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import MapPage from './pages/Map/MapPage';
import AdsListPage from './pages/Ads/AdsListPage';
import AdsListPageLists from './pages/Ads/AdsListPageLists';
import FooterNav from './components/Footer/FooterNav';
import AdSubscriptionPage from './pages/Ads/AdSubscriptionPage';
import AdCreatePage from './pages/Ads/AdsCreatePage';
import AdsEditPage from './pages/Ads/AdsEditPage';
import LoginPage from './pages/Auth/LoginPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import UserManagement from './pages/User/UserManagement';
import RequireAuth from './components/requireAuth';
import { useState } from 'react';
import { ProfileInterface } from './services/interfaces/Profile';
import { ContactInterface } from './services/interfaces/Contact';
import { User } from './services/interfaces/User';

function App() {
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
  const [contactForms, setContactForms] = useState<ContactInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  function handleSubmitProfile(profile: ProfileInterface): void {
    setProfiles([...profiles, profile]);
  }

  function handleSubmitContactForm(contactForm: ContactInterface): void {
    setContactForms([...contactForms, contactForm]);
  }

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password-page" element={<ForgotPasswordPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/users-handling" element={<UserManagement handleSubmitUser={(_user: User) => { /* Implémentation */ }} />} />
          </Route>
          
          <Route path="/my-account" element={<UserProfilePage />} />
          <Route path="/editer-mon-profil/:idProfile" element={<UserEditProfilePage handleSubmitProfile={handleSubmitProfile} />} />
          <Route path="/ad/:idAd" element={<AdsDetailPage />} />
          <Route path="/my-ads/:idUser" element={<AdSubscriptionPage />} />
          <Route path="/new-ad" element={<AdCreatePage />} />
          <Route path="/edit-ad/:adId" element={<AdsEditPage />} />
          <Route path="/calendar" element={<CalendarPage searchQuery={searchQuery} />} />
          <Route path="/map" element={<MapPage searchQuery={searchQuery} />} />
          <Route path="/confidentiality" element={<ConfidentialityPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/contact" element={<ContactPage handleSubmitContactForm={handleSubmitContactForm} />} />
          <Route path="/ads-grid" element={<AdsListPage searchQuery={searchQuery} />} />
          <Route path="/ads-list" element={<AdsListPageLists searchQuery={searchQuery} />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <FooterNav />
    </>
  );
}

export default App;

