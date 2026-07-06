import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import AuthContext from "../context/AuthContext";

function PublicRoute({ children }) {

    const { isAuthenticated } = useContext(AuthContext);

    const location = useLocation();

    if (
        isAuthenticated &&
        location.pathname !== "/"
    ) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;

}

export default PublicRoute;