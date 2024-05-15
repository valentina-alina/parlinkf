import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './services/utils/NotFoundPage';
import PrivateRoute from './services/utils/PrivateRoute';
import LoginPage from './pages/Auth/LoginPage';
import HeaderMenu from './components/Navbar/HeaderMenu';

function App() {

  return (
    <>
     {/* <LoginPage/> */}
     <HeaderMenu/>
    </>
  )
}

export default App
