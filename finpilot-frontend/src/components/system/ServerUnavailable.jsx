import {
    ServerCrash,
    RefreshCcw,
} from "lucide-react";

function ServerUnavailable() {

    function handleRetry() {

        window.location.reload();

    }

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

            <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-100">

                    <ServerCrash
                        size={48}
                        className="text-amber-600"
                    />

                </div>

                <h1 className="mt-8 text-3xl font-bold text-slate-900">

                    Server Unavailable

                </h1>

                <p className="mt-4 leading-7 text-gray-500">

                    FinPilot couldn't connect to the server.

                    <br />

                    The server may be temporarily unavailable
                    or undergoing maintenance.

                </p>

                <button
                    onClick={handleRetry}
                    className="mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >

                    <RefreshCcw size={18} />

                    Retry

                </button>

            </div>

        </div>

    );

}

export default ServerUnavailable;