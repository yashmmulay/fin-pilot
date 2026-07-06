import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaChevronDown,
    FaUser,
    FaRightFromBracket,
} from "react-icons/fa6";

import { toast } from "react-hot-toast";

import AuthContext from "../../context/AuthContext";

function UserMenu() {

    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    function handleLogout() {

        logout();

        toast.success("Logged out successfully.");

        navigate("/", {
            replace: true,
        });

    }

    const initials = user?.fullName
        ?.split(" ")
        .map(name => name[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    return (

        <div
            ref={menuRef}
            className="relative"
        >

            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100"
            >

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">

                    {initials}

                </div>

                <div className="hidden text-left md:block">

                    <p className="font-semibold text-gray-800">

                        {user?.fullName}

                    </p>

                    <p className="text-sm text-gray-500">

                        {user?.email}

                    </p>

                </div>

                <FaChevronDown
                    className={`transition duration-200 ${
                        open
                            ? "rotate-180"
                            : ""
                    }`}
                />

            </button>

            {open && (

                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-xl border bg-white shadow-xl">

                    <div className="border-b bg-gray-50 p-5">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

                                {initials}

                            </div>

                            <div>

                                <p className="font-semibold">

                                    {user?.fullName}

                                </p>

                                <p className="text-sm text-gray-500">

                                    {user?.email}

                                </p>

                            </div>

                        </div>

                    </div>

                    <button
                        onClick={() => {

                            setOpen(false);

                            navigate("/profile");

                        }}
                        className="flex w-full items-center gap-3 px-5 py-4 transition hover:bg-gray-100"
                    >

                        <FaUser />

                        My Profile

                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-5 py-4 text-red-600 transition hover:bg-red-50"
                    >

                        <FaRightFromBracket />

                        Logout

                    </button>

                </div>

            )}

        </div>

    );

}

export default UserMenu;