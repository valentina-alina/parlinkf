/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './services/utils/NotFoundPage';
import PrivateRoute from './services/utils/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import AdsDetailPage from './pages/Ads/AdsDetailPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import MapPage from './pages/Map/MapPage';
import AdsListPage from './pages/Ads/AdsListPage';
import AdsListPageLists from './pages/Ads/AdsListPageLists';
import FooterNav from './components/Footer/FooterNav';
import AdSubscriptionPage from './pages/Ads/AdSubscriptionPage';
import AdCreatePage from './pages/Ads/AdsCreatePage';
import AdsEditPage from './pages/Ads/AdsEditPage';
import LoginPage from './pages/Auth/LoginPage';
import ForgotPswdPage from './pages/Auth/ForgotPasswordPage';
import RequireAuth from './components/requireAuth';
import { Suspense, lazy, useState } from 'react';
import { ProfileInterface } from './services/interfaces/Profile';
import { ContactInterface } from './services/interfaces/Contact';
import { User } from './services/interfaces/User';
import ClientAdminCreatePage from './pages/User/ClientAdminCreatePage';

const ConfidentialityPage = lazy(() => import('./pages/Confidentiality/ConfidentialityPage'));
const LegalPage = lazy(() => import('./pages/Legal/LegalPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const UserManagement = lazy(() => import('./pages/User/UserManagement'));
const UserProfilePage = lazy(() => import('./pages/User/UserProfilePage'));
const UserEditProfilePage = lazy(() => import('./pages/User/UserEditProfilePage'));

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
            <Route path="/users-handling" element=
            {
              <Suspense fallback={<div>Chargement...</div>}>
                <UserManagement handleSubmitUser={(_user: User) => { /* Implémentation */ }} />
              </Suspense>
            }
          />
          </Route>
          
          <Route path="/my-account" element=
            {
            <Suspense fallback={<div>Chargement...</div>}>
              <UserProfilePage />
            </Suspense>
            }
          />
          <Route path="/edit-my-profile/:idProfile" element=
            {
            <Suspense fallback={<div>Chargement...</div>}>
              <UserEditProfilePage handleSubmitProfile={handleSubmitProfile}  />
            </Suspense>
            }
          />
          <Route path="/ad/:idAd" element={<AdsDetailPage />} />
          <Route path="/my-ads/:idUser" element={<AdSubscriptionPage />} />
          <Route path="/new-ad" element={<AdCreatePage />} />
          <Route path="/edit-ad/:adId" element={<AdsEditPage />} />
          <Route path="/calendar" element={<CalendarPage searchQuery={searchQuery} />} />
          <Route path="/map" element={<MapPage searchQuery={searchQuery} />} />
          <Route path="/confidentiality" element=
            {
            <Suspense fallback={<div>Chargement...</div>}>
              <ConfidentialityPage />
            </Suspense>
            }
          />
          <Route path="/legal" element=
            {
            <Suspense fallback={<div>Chargement...</div>}>
              <LegalPage />
            </Suspense>
            }
          />
          <Route path="/contact" element=
            {
            <Suspense fallback={<div>Chargement...</div>}>
              <ContactPage  handleSubmitContactForm={handleSubmitContactForm} />
            </Suspense>
            }
          />
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