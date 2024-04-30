import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './services/utils/NotFoundPage';
import PrivateRoute from './services/utils/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import NavbarMobile from './components/Navbar/NavbarMobile';

function App() {

  return (
    <>
      <Navbar />
      <NavbarMobile />
      <Routes>
          <Route path="/" />

            <Route element={ <PrivateRoute /> }>

            </Route>

          <Route path="*" element= { <NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
