import { NavLink } from "react-router-dom";

import {
    FaChartPie,
    FaWallet,
    FaBullseye,
    FaEye,
} from "react-icons/fa6";

const menuItems = [
    {
        title: "Dashboard",
        icon: <FaChartPie />,
        path: "/dashboard",
    },
    {
        title: "Portfolio",
        icon: <FaWallet />,
        path: "/portfolio",
    },
    {
        title: "Goals",
        icon: <FaBullseye />,
        path: "/goals",
    },
    {
        title: "Watchlist",
        icon: <FaEye />,
        path: "/watchlist",
    },
];

function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}) {

    function closeSidebar() {

        setSidebarOpen(false);

    }

    return (

        <>
            {/* Mobile Backdrop */}

            {sidebarOpen && (

                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />

            )}

            {/* Sidebar */}

            <aside
                className={`
                    fixed top-16 left-0 z-50
                    h-[calc(100vh-64px)]
                    w-64
                    border-r
                    bg-white
                    transition-transform
                    duration-300
                    ease-in-out

                    ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"}

                    lg:sticky
                    lg:translate-x-0
                `}
            >

                <nav className="flex h-full flex-col overflow-y-auto p-4">

                    <div className="flex flex-col gap-2">

                        {menuItems.map((item) => (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >

                                <span className="text-lg">

                                    {item.icon}

                                </span>

                                <span>

                                    {item.title}

                                </span>

                            </NavLink>

                        ))}

                    </div>

                </nav>

            </aside>
        </>

    );

}

export default Sidebar;