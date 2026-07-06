import {
    Routes,
    Route,
} from "react-router-dom";

import Layout from "../components/layout/Layout";

import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import Portfolio from "../pages/Portfolio";
import Goals from "../pages/Goals";
import Watchlist from "../pages/Watchlist";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {

    return (

        <Routes>

            {/* =========================================
                         Public Routes
               ========================================= */}

            <Route
                path="/"
                element={
                    <PublicRoute>
                        <LandingPage />
                    </PublicRoute>
                }
            />

            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            {/* =========================================
                       Protected Routes
               ========================================= */}

            <Route
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/portfolio"
                    element={<Portfolio />}
                />

                <Route
                    path="/goals"
                    element={<Goals />}
                />

                <Route
                    path="/watchlist"
                    element={<Watchlist />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

            </Route>

            {/* =========================================
                           404 Page
               ========================================= */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default AppRoutes;