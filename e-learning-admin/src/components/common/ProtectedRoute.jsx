import Cookies from "js-cookie";
import { Navigate,Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const token = Cookies.get("admin_token");
    if(!token){
        return <Navigate to="/"/>
    }

     return <Outlet/>;
}