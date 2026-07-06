import { TrendingUp, Menu } from "lucide-react";

import UserMenu from "./UserMenu";

function Navbar({
    sidebarOpen,
    setSidebarOpen,
}) {

    return (

        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-8">

            {/* Left Section */}

            <div className="flex items-center gap-3">

                {/* Mobile Hamburger */}

                <button
                    onClick={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                    className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
                >

                    <Menu size={24} />

                </button>

                {/* Logo */}

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">

                        <TrendingUp
                            size={24}
                            className="text-white"
                            strokeWidth={2.5}
                        />

                    </div>

                    <div>

                        <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">

                            <span className="text-slate-900">

                                Fin

                            </span>

                            <span className="text-blue-600">

                                Pilot

                            </span>

                        </h1>

                        <p className="hidden text-xs font-medium tracking-wide text-gray-500 sm:block">

                            Smart Investment Tracker

                        </p>

                    </div>

                </div>

            </div>

            {/* User Menu */}

            <UserMenu />

        </header>

    );

}

export default Navbar;