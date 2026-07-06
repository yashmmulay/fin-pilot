import { useContext } from "react";

import AuthContext from "../../context/AuthContext";

import {
    FaArrowTrendUp,
    FaClock,
} from "react-icons/fa6";

function DashboardHeader({ dashboard }) {

    const { user } = useContext(AuthContext);

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {

        greeting = "Good Morning";

    } else if (hour < 17) {

        greeting = "Good Afternoon";

    }

    const today = new Date().toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

    const firstName =
        user?.fullName?.split(" ")[0] ||
        user?.name?.split(" ")[0] ||
        "Investor";

    return (

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-4 text-white shadow-lg">

            <div className="flex items-center justify-between">

                {/* Left */}

                <div>

                    <p className="text-sm text-blue-100">

                        {today}

                    </p>

                    <h1 className="mt-1 text-2xl font-bold">

                        {greeting}, {firstName}

                    </h1>

                    <p className="text-sm text-blue-100">

                        Here's your portfolio overview for today.

                    </p>

                </div>

                {/* Right */}

                <div className="hidden gap-3 md:grid md:grid-cols-2">

                    <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">

                        <div className="flex items-center gap-2 text-sm">

                            <FaArrowTrendUp />

                            <span>Portfolio Return</span>

                        </div>

                        <h2 className="mt-1 text-xl font-bold">

                            {Number(
                                dashboard.returnPercentage
                            ).toFixed(2)}%

                        </h2>

                    </div>

                    <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">

                        <div className="flex items-center gap-2 text-sm">

                            <FaClock />

                            <span>Last Updated</span>

                        </div>

                        <h2 className="mt-1 text-base font-semibold">

                            Just Now

                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardHeader;