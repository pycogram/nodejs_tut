import { useContext } from "react";
import { UserContext } from "../contexts/userContexts";
import { Navigate, Outlet } from "react-router-dom";

const UserRoutes = () => {
    const {user} = useContext(UserContext);
    //console.log(1234, user);
    return ( 
        user.email ? <Outlet /> : <Navigate to={'/login'} />
    );
}
 
export default UserRoutes;