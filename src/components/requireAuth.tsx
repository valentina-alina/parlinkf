/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import NotFoundPage from "../services/utils/NotFoundPage";

interface CustomPayLoad extends JwtPayload {
    role?: string;
}

const RequireAuth = ({ allowedRoles }:any) => {
    const accessToken = localStorage.getItem('accessToken');
    let userRole = null;

    if (accessToken) {
        try {
            const tokenDecode = jwtDecode(accessToken) as CustomPayLoad;
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
