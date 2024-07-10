/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NotFoundPage from "../services/utils/NotFoundPage";


const RequireAuth = ({ allowedRoles }:any) => {
    const accessToken = localStorage.getItem('accessToken');
    let userRole = null;

    if (accessToken) {
        try {
            const tokenDecode = jwtDecode(accessToken);
            userRole = tokenDecode?.role;
        } catch (error) {
            console.error("Invalid token", error);
        }
    }

    return (
        allowedRoles.includes(userRole)
            ? <Outlet />
            : <NotFoundPage />
    );
}

export default RequireAuth;
