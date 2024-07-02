import { useLocation, Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import NotFoundPage from "../services/utils/NotFoundPage";

const RequireAuth = ({ allowedRoles }) => {
    // const { auth } = useAuth();

    const accessToken=localStorage.getItem('accessToken');
    console.log("accessToken:",accessToken);
    const tokenDecode =accessToken?jwtDecode(accessToken):undefined;
    console.log(tokenDecode)
    const  auth  = tokenDecode.role;
    
    const location = useLocation();
console.log("auth :", auth,"allowedRoles:",allowedRoles,auth===allowedRoles);
    return (

        auth===allowedRoles
            ? <Outlet />
            : <NotFoundPage />
    );
}

export default RequireAuth;