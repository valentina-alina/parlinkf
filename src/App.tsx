import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from './services/utils/NotFoundPage';
import PrivateRoute from './services/utils/PrivateRoute';
import LoginPage from './pages/Auth/LoginPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';

export default function App() {

  return(
    <>
      {/* <LoginPage/> */}
      <Link to="/login-page" className="ms-2 text-sm  text-blue-400 dark:text-blue-300 hover:underline">Connecter-vous </Link>
      <Routes>
        <Route path="/" />
        <Route path="/forgot-password-page" element ={<ForgotPasswordPage/> } /> 
        <Route path="/login-page" element = {<LoginPage/>} />
      </Routes>
    </>
  )
}


