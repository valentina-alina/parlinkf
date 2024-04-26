import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './services/utils/NotFoundPage';
import PrivateRoute from './services/utils/PrivateRoute';
import UserProfilePage from './pages/User/UserProfilePage';

function App() {

  return (
    <>
      <Routes>
          <Route path="/" />

            <Route element={ <PrivateRoute /> }>
              <Route path='/mon-compte' element={ <UserProfilePage /> } />
            </Route>

          <Route path="*" element= { <NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
