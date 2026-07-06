import { WifiOff, RefreshCcw } from "lucide-react";

function NoInternet() {

    function handleRetry() {

        window.location.reload();

    }

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

            <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">

                {/* Icon */}

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">

                    <WifiOff
                        size={48}
                        className="text-red-600"
                    />

                </div>

                {/* Title */}

                <h1 className="mt-8 text-3xl font-bold text-slate-900">

                    No Internet Connection

                </h1>

                {/* Subtitle */}

                <p className="mt-4 text-gray-500 leading-7">

                    FinPilot couldn't connect to the internet.

                    <br />

                    Please check your Wi-Fi or mobile data
                    and try again.

                </p>

                {/* Retry */}

                <button
                    onClick={handleRetry}
                    className="mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
                >

                    <RefreshCcw size={18} />

                    Retry

                </button>

            </div>

        </div>

    );

}

export default NoInternet;