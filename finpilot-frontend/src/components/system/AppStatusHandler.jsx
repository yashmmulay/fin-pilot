import { useEffect, useState } from "react";

import NoInternet from "./NoInternet";
import ServerUnavailable from "./ServerUnavailable";

import useNetworkStatus from "../../hooks/useNetworkStatus";

import { checkServerHealth } from "../../services/healthService";

function AppStatusHandler({ children }) {

    const isOnline = useNetworkStatus();

    const [checkingServer, setCheckingServer] = useState(true);

    const [serverAvailable, setServerAvailable] = useState(true);

    useEffect(() => {

        async function verifyServer() {

            if (!isOnline) {

                setCheckingServer(false);

                return;

            }

            setCheckingServer(true);

            try {

                await checkServerHealth();

                setServerAvailable(true);

            } catch (error) {

                console.error("Health check failed:", error);

                setServerAvailable(false);

            } finally {

                setCheckingServer(false);

            }

        }

        verifyServer();

    }, [isOnline]);

    /*
    |--------------------------------------------------------------------------
    | No Internet
    |--------------------------------------------------------------------------
    */

    if (!isOnline) {

        return <NoInternet />;

    }

    /*
    |--------------------------------------------------------------------------
    | Checking Server
    |--------------------------------------------------------------------------
    */

    if (checkingServer) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-slate-50">

                <div className="text-center">

                    <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                    <h2 className="mt-6 text-2xl font-bold text-slate-900">

                        Connecting to FinPilot...

                    </h2>

                    <p className="mt-2 text-gray-500">

                        Please wait while we verify the server.

                    </p>

                </div>

            </div>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Server Down
    |--------------------------------------------------------------------------
    */

    if (!serverAvailable) {

        return <ServerUnavailable />;

    }

    return children;

}

export default AppStatusHandler;