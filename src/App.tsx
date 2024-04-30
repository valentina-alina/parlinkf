import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './services/utils/NotFoundPage';
import PrivateRoute from './services/utils/PrivateRoute';
import AdsDetailPage from './pages/Ads/AdsDetailPage';

function App() {

  return (
    <>
      <Routes>
          <Route path="/" />

            <Route element={ <PrivateRoute /> }>
              <Route path='/annonce/:idAd' element={ <AdsDetailPage /> } />
            </Route>

          <Route path="*" element= { <NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
